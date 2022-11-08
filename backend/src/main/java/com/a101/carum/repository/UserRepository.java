package com.a101.carum.repository;

import com.a101.carum.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserIdAndPasswordAndIsDeleted(String userId, String password, boolean b);

    Optional<User> findByIdAndIsDeleted(Long id, boolean b);

    User findByUserIdAndIsDeleted(String userId, boolean b);

    User findByNickNameAndIsDeleted(String nickName, boolean b);

    List<User> findAllByIsDeleted(boolean b);
}
