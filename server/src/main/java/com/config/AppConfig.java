package com.config;

import com.services.AccountService;
import com.services.UserService;
import com.utils.PdfReportUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;

@Configuration
public class AppConfig {

    @Autowired
    private AccountService accountService;

    @Autowired
    private UserService userService;

    @PostConstruct
    public void init() {
        PdfReportUtil.setAccountService(accountService);
        PdfReportUtil.setUserService(userService);
    }
}