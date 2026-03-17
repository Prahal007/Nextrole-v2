package com.nextrole.service;

import com.nextrole.entity.Resume;
import com.nextrole.repository.ResumeRepository;
import com.nextrole.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    public Resume upload(MultipartFile file, String email) {
        var user = userRepository.findByEmail(email).orElseThrow();
        String content;
        try {
            byte[] bytes = file.getBytes();
            try (var doc = Loader.loadPDF(bytes)) {
                content = new PDFTextStripper().getText(doc);
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to parse PDF", e);
        }
        var resume = Resume.builder()
            .user(user)
            .filename(file.getOriginalFilename())
            .content(content)
            .build();
        return resumeRepository.save(resume);
    }

    public List<Resume> listForUser(String email) {
        var user = userRepository.findByEmail(email).orElseThrow();
        return resumeRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }

    public Resume findById(UUID id) {
        return resumeRepository.findById(id).orElseThrow();
    }
}