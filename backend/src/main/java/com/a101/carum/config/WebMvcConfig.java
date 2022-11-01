package com.a101.carum.config;

import com.a101.carum.common.interceptor.JwtInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer {

    private final JwtInterceptor jwtInterceptor;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("https://j7a705.q.ssafy.io" ,"http://localhost:8080", "http://localhost:8081", "http://localhost:3000")
                .allowedMethods("*")
                .allowCredentials(true);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // TODO 필요 url에 적용 필요
        //registry.addInterceptor(jwtInterceptor)
        //      .addPathPatterns("/**");
    }

}
