package com.nextrole.controller;

import com.nextrole.dto.*;
import com.nextrole.entity.*;
import com.nextrole.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/resumes")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;
    private final OptimizationService optimizationService;

    @PostMapping("/upload")
    public ResponseEntity<Resume> upload(
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal UserDetails principal) {
        return ResponseEntity.ok(resumeService.upload(file, principal.getUsername()));
    }

    @GetMapping
    public ResponseEntity<List<Resume>> list(@AuthenticationPrincipal UserDetails principal) {
        return ResponseEntity.ok(resumeService.listForUser(principal.getUsername()));
    }

    @PostMapping("/{resumeId}/optimize")
    public ResponseEntity<JobStatusResponse> optimize(
            @PathVariable UUID resumeId,
            @RequestBody OptimizeRequest req,
            @AuthenticationPrincipal UserDetails principal) {
        return ResponseEntity.accepted().body(
            optimizationService.startJob(resumeId, req, principal.getUsername())
        );
    }

    @GetMapping("/jobs/{jobId}")
    public ResponseEntity<JobStatusResponse> jobStatus(
            @PathVariable UUID jobId,
            @AuthenticationPrincipal UserDetails principal) {
        return ResponseEntity.ok(optimizationService.getJobStatus(jobId, principal.getUsername()));
    }
}
