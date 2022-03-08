package mlops.mlopsapi.service;

import lombok.RequiredArgsConstructor;
import mlops.mlopsapi.domain.User;
import mlops.mlopsapi.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public Long saveUser(User user) {
        validateUserDuplicate(user);
        userRepository.save(user);
        return user.getId();
    }

    private void validateUserDuplicate(User user) {
        List<User> findUsers= userRepository.findByName(user.getName());
        if (!findUsers.isEmpty()) {
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        }
    }

    @Transactional
    public void updateUser(Long userId,String name, int age) {
        User user = userRepository.findOne(userId);
        user.setName(name);
        user.setAge(age);
    }

    @Transactional
    public void deleteUser(Long userId) {
        User user = userRepository.findOne(userId);
        userRepository.delete(user);
    }

    public User findOne(Long userId) {
        return userRepository.findOne(userId);
    }

    public List<User> findUsers() {
        return userRepository.findAll();
    }
}
