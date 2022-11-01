package com.a101.carum.service;

import com.a101.carum.common.exception.UnAuthorizedException;
import com.a101.carum.domain.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.Date;

@Service
public class JwtService {

    private final String secretKey = "unityCarum";
    private final int EXPIRE_MINUTES = 60 * 24;
    private final int REFRESH_MINUTES = 60 * 24 * 7;

    /**
     * request header에서 token을 가져오는 함수
     * interceptor에서 valid와 존재여부를 검사할 것이므로 여기선 따로 하지 않는다.
     *
     * @param request HttpServletRequest
     * @return 받아온 값
     */
    public String getJwtToken(HttpServletRequest request) {
        return request.getHeader("access-token");
    }

    public String getrefreshToken(HttpServletRequest request) {
        return request.getHeader("refresh-token");
    }
    /**
     * user 정보를 기반으로 jwt token을 생성함
     *
     * @param user 유저 엔티티
     * @return jwt token
     */
    public String createToken(User user) throws UnsupportedEncodingException {
        String jwt = Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * EXPIRE_MINUTES))
                .claim("userId", user.getId())
                .signWith(SignatureAlgorithm.HS256, generateKey()).compact();
        return jwt;
    }

    public String createRefreshToken() throws UnsupportedEncodingException {
        String jwt = Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * REFRESH_MINUTES))
                .signWith(SignatureAlgorithm.HS256, generateKey()).compact();
        return jwt;
    }

    /**
     * swcretkey를 기반으로 key를 생성함
     *
     * @return key
     */
    private byte[] generateKey() throws UnsupportedEncodingException {
        try {
            return secretKey.getBytes("UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw e;
        }
    }

    /**
     * Jwt Token이 유효한지 날짜를 계산함
     *
     * @param jwt jwt token string
     * @return boolean 유효하지 않으면 exception throw
     */
    public boolean checkJwtToken(String jwt) {
        try {
            return getClaims(jwt).getExpiration().after(new Date());
        } catch (Exception e) {
            throw new UnAuthorizedException("잘못된 토큰입니다.");
        }
    }

    /**
     * jwt token에서 userid를 구함
     *
     * @param request HttpServletRequest
     * @return user id
     */
    public Long getUserId(HttpServletRequest request){
        try {
            return Long.parseLong(String.valueOf(getClaims(getJwtToken(request)).get("userId")));
        } catch (Exception e){
            throw new UnAuthorizedException("잘못된 토큰입니다.");
        }
    }

    public Long getUserId(String accessToken){
        try {
            return Long.parseLong(String.valueOf(getClaims(accessToken).get("userId")));
        } catch (Exception e){
            throw new UnAuthorizedException("잘못된 토큰입니다.");
        }
    }

    /**
     * jwt token에서 claim을 구함
     *
     * @param jwt jwt token
     * @return claims
     */
    private Claims getClaims(String jwt) throws UnsupportedEncodingException {
        try {
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(generateKey())
                    .parseClaimsJws(jwt);
            return claims.getBody();
        } catch (UnsupportedEncodingException e) {
            throw e;
        }
    }

}
