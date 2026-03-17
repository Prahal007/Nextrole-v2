package com.nextrole.service;

import com.nextrole.dto.*;
import com.nextrole.entity.OptimizationJob;
import com.nextrole.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class OptimizationService {

    private final OptimizationJobRepository jobRepository;
    private final UserRepository userRepository;
    private final ResumeService resumeService;
    private final WebClient aiServiceWebClient;

    public JobStatusResponse startJob(UUID resumeId, OptimizeRequest req, String email) {
        var user = userRepository.findByEmail(email).orElseThrow();
        var resume = resumeService.findById(resumeId);
        var job = OptimizationJob.builder()
            .user(user)
            .resume(resume)
            .jobDescription(req.jobDescription())
            .status("PENDING")
            .build();
        job = jobRepository.save(job);
        callAiService(job.getId(), resume.getContent(), req.jobDescription());
        return toResponse(job);
    }

    @Async
    public void callAiService(UUID jobId, String resumeText, String jobDescription) {
        var job = jobRepository.findById(jobId).orElseThrow();
        try {
            job.setStatus("PROCESSING");
            jobRepository.save(job);

            var payload = Map.of("resume_text", resumeText, "job_description", jobDescription);
            var result = aiServiceWebClient.post()
                .uri("/optimize")
                .bodyValue(payload)
                .retrieve()
                .bodyToMono(Map.class)
                .block();

            job.setResult(result);
            job.setAtsScore((Integer) result.get("ats_score"));
            job.setStatus("COMPLETED");
        } catch (Exception e) {
            log.error("AI service error for job {}", jobId, e);
            job.setStatus("FAILED");
        }
        jobRepository.save(job);
    }

    public JobStatusResponse getJobStatus(UUID jobId, String email) {
        var job = jobRepository.findById(jobId).orElseThrow();
        return toResponse(job);
    }

    private JobStatusResponse toResponse(OptimizationJob job) {
        return new JobStatusResponse(job.getId(), job.getStatus(), job.getAtsScore(), job.getResult());
    }
}
