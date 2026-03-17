package com.nextrole.repository;

import com.nextrole.entity.OptimizationJob;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface OptimizationJobRepository extends JpaRepository<OptimizationJob, UUID> {
    List<OptimizationJob> findByUserIdOrderByCreatedAtDesc(UUID userId);
    List<OptimizationJob> findByResumeIdOrderByCreatedAtDesc(UUID resumeId);
}
