package mlops.mlopsapi.service;

import mlops.mlopsapi.domain.User;
import mlops.mlopsapi.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
class UserServiceTest {

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Test
    @Rollback(value = false)
    void 회원가입() {
        // given
        User user = new User();
        user.setName("seokmin");

        // when
        Long savedId=userService.saveUser(user);

        // then
        Assertions.assertEquals(user, userService.findOne(savedId));
    }

    @Test
    void 중복_회원가입() throws Exception{
        // given
        User user1 = new User();
        user1.setName("seokmin");

        User user2 = new User();
        user2.setName("seokmin");

        // when
        userService.saveUser(user1);

        // then
        Assertions.assertThrows(IllegalStateException.class, () -> {
            userService.saveUser(user2);
        });
    }


}