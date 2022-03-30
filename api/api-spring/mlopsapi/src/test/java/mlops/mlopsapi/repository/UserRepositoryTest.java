package mlops.mlopsapi.repository;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import mlops.mlopsapi.domain.User;
import org.hibernate.exception.ConstraintViolationException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class UserRepositoryTest {

    @Autowired
    UserRepository userRepository;

    @Test
    @Transactional
    void 유저생성() {
        // given
        User user = new User();
        user.setAge(20);
        user.setName("seokmin");
        Long savedId = userRepository.save(user);

        // when
        User findUser = userRepository.findOne(savedId);

        // then
        Assertions.assertEquals(20, findUser.getAge());
        Assertions.assertEquals("seokmin", findUser.getName());
    }

    @Test
    @Transactional
    @Rollback(value = false)
    void 나이null() {
        // given
        User user = new User();
        user.setName("seokmin");

        // when
        Long savedId=userRepository.save(user);

        // then


    }

    @Test
    @Transactional
    @Rollback(value = false)
    void 유저중복생성() throws Exception{
        // given
        User user1 = new User();
        user1.setName("seokmin");

        User user2 = new User();
        user2.setName("seokmin");

        // when
        userRepository.save(user1);
        Assertions.assertThrows(DataIntegrityViolationException.class, () -> {
            userRepository.save(user2);
        });

    }

    @Test
    @Transactional
    void 회원삭제() {
        // given
        User user = new User();
        user.setAge(30);
        user.setName("seokmin");

        // when
        Long savedId=userRepository.save(user);
        userRepository.delete(userRepository.findOne(savedId));

        // then
        Assertions.assertEquals(userRepository.findAll().size(),0);

    }

}