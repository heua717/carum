package com.a101.carum.common.interceptor;

import com.a101.carum.common.exception.UnAuthorizedException;
import com.a101.carum.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
@RequiredArgsConstructor
public class JwtInterceptor implements HandlerInterceptor {

    private final JwtService jwtService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws UnAuthorizedException {
        if (HttpMethod.OPTIONS.matches(request.getMethod())) {
            return true;
        }
        String token = jwtService.getJwtToken(request);;
        if(jwtService.checkJwtToken(token)){
            return true;
        } else {
            throw new UnAuthorizedException("access token을 재 발급 받으십시오");
        }

    }
}
