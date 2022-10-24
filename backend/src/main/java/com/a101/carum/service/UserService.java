package com.a101.carum.service;

import com.a101.carum.api.dto.ReqPostUser;
import com.a101.carum.domain.user.User;
import com.a101.carum.domain.user.UserDetail;
import com.a101.carum.repository.UserDetailRepository;
import com.a101.carum.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserDetailRepository userDetailRepository;

    @Transactional
    public void createUser(ReqPostUser reqPostUser) {
        User user = User.builder()
                .userId(reqPostUser.getUserId())
                .birth(reqPostUser.getBirth())
                .nickname(reqPostUser.getNickname())
                .password(reqPostUser.getPassword())
                .phone(reqPostUser.getPhone())
                .build();

        user = userRepository.save(user);

        //TODO: Room 4개 생성 및 Main Room 설정해서 코드 수정
        
        UserDetail userDetail = UserDetail.builder()
                .user(user)
                .build();

        userDetailRepository.save(userDetail);
    }
}
