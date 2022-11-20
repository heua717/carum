package com.a101.carum.domain.user;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
@Getter
@ToString
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "BIGINT(20) UNSIGNED")
    private Long id;

    @Column(name = "user_id", nullable = false, length = 30)
    private String userId;

    @Column(name = "nickname", nullable = false, length = 30)
    private String nickName;

    @Column(name = "password", nullable = false, length = 100)
    private String password;

    @Column(name="birth", nullable = false)
    private LocalDate birth;

    @Column(name="phone", nullable = false)
    private String phone;

    @Column(name="is_deleted")
    private boolean isDeleted = false;

    @Column(name="user_type", length = 10)
    @Enumerated(EnumType.STRING)
    private UserType userType = UserType.USER;

    @Builder
    public User(String userId, String nickName, String password, String phone, LocalDate birth){
        this.userId = userId;
        this.nickName = nickName;
        this.password = password;
        this.phone = phone;
        this.birth = birth;
    }

    public void updateNickName(String nickName){
        this.nickName = nickName;
    }

    public void updatePassword(String newPassword) {
        this.password = newPassword;
    }

    public void updateIsDeleted() {
        this.isDeleted = true;
    }
}
