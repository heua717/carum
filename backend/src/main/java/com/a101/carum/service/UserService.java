package com.a101.carum.service;

import com.a101.carum.api.dto.ReqLoginUser;
import com.a101.carum.api.dto.ReqPostUser;
import com.a101.carum.api.dto.ResGetUser;
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
                .nickName(reqPostUser.getNickName())
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

    public void logoutUser(Long id) {
        // TODO: delete refreshtoken from redis
    }

    @Transactional
    public ResGetUser readUser(Long id) {
        ResGetUser.ResGetUserBuilder resGetUserBuilder = ResGetUser.builder();

        // User Table에서 정보 가져오기
        User user = userRepository.findByIdAndIsDeleted(id, false).orElseThrow(() -> new NullPointerException("User를 찾을 수 없습니다."));
        resGetUserBuilder
                .userId(user.getUserId())
                .nickName(user.getNickName())
                .birth(user.getBirth())
                .phone(user.getPhone());

        // User Detail에서 정보 가져오기
        UserDetail userDetail = userDetailRepository.findByUser(user).orElseThrow(() -> new NullPointerException("User 정보가 손상되었습니다."));
        resGetUserBuilder
                .money(userDetail.getMoney());
        
        // TODO: Main Room 관련 정보 삽입
        
        return resGetUserBuilder.build();
    }
}
