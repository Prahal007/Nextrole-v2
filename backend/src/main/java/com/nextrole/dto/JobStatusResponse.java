package com.nextrole.dto;
import java.util.Map;
import java.util.UUID;
public record JobStatusResponse(UUID jobId, String status, Integer atsScore, Map<String, Object> result) {}
