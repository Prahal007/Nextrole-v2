package com.nextrole.dto;
import jakarta.validation.constraints.*;
public record OptimizeRequest(@NotBlank String jobDescription) {}
