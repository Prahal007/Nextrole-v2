package com.nextrole;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class NextRoleApplication {
    public static void main(String[] args) {
        SpringApplication.run(NextRoleApplication.class, args);
    }
}
