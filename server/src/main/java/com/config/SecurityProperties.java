package com.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "jwt")
public class SecurityProperties {

    private String secret;
    private long expiration;

}