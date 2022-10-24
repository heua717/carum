package com.a101.carum.service;

import com.a101.carum.api.dto.ReqLoginUser;
import com.a101.carum.api.dto.ReqPostUser;
import com.a101.carum.api.dto.ResLoginUser;
import com.a101.carum.domain.user.User;
import com.a101.carum.domain.user.UserDetail;
import com.a101.carum.repository.UserDetailRepository;
import com.a101.carum.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.UnsupportedEncodingException;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserDetailRepository userDetailRepository;
    private final JwtService jwtService;

    @Transactional
    public void createUser(ReqPostUser reqPostUser) {
        
        // TODO: 비밀번호 암호화
        
        User user = User.builder()
                .userId(reqPostUser.getUserId())
                .birth(reqPostUser.getBirth())
                .nickname(reqPostUser.getNickname())
                .password(reqPostUser.getPassword())
                .phone(reqPostUser.getPhone())
                .build();

        user = userRepository.save(user);

        // TODO: Room 4개 생성 및 Main Room 설정해서 코드 수정
        
        UserDetail userDetail = UserDetail.builder()
                .user(user)
                .build();

        userDetailRepository.save(userDetail);
    }

    public ResLoginUser loginUser(ReqLoginUser reqLoginUser) throws UnsupportedEncodingException {
        User user = userRepository.findByUserIdAndPasswordAndIsDeleted(
                reqLoginUser.getUserId(),
                reqLoginUser.getPassword(),
                false).orElseThrow(() -> new NullPointerException("User를 찾을 수 없습니다."));

        String accessToken = jwtService.createToken(user);
        String refreshToken = jwtService.createRefreshToken();
        
        // TODO: refresh token redis에 저장

        return ResLoginUser.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }
}
