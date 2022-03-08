package mlops.mlopsapi.api;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import mlops.mlopsapi.domain.User;
import mlops.mlopsapi.service.UserService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserApiController {
    private final UserService userService;

    /**
     * 1. Get all users ( refactoring 필요 )
     */

    @GetMapping(value = "/user")
    public List<User> findMembers() {
        return userService.findUsers();
    }


    /**
     * 2. Get a user ( refactoring 필요 )
     */
    @GetMapping(value = "/user/{id}")
    public User findMember(@PathVariable("id") Long id) {
        return userService.findOne(id);
    }


    /**
     * 3. Create a user
     */
    @PostMapping(value = "/user")
    public CreateMemberResponse saveMember(@RequestBody @Validated CreateMemberRequest request) {

        User user = new User();
        user.setName(request.getName());
        user.setAge(request.getAge());

        try {
            userService.saveUser(user);
            return new CreateMemberResponse(true);
        } catch (Exception e) {
            return new CreateMemberResponse(false);
        }

    }

    /**
     * 4. Update a user
     */
    @PutMapping(value = "/user/{id}")
    public UpdateMemberResponse updateMember(@PathVariable("id") Long id,@RequestBody @Validated UpdateMemberRequest request) {

        try {
            userService.updateUser(id, request.getName(), request.getAge());
            return new UpdateMemberResponse(true);
        } catch (Exception e) {
            e.printStackTrace();
            return new UpdateMemberResponse(false);
        }

    }

    /**
     * 5. Delete a user
     */
    @DeleteMapping(value = "/user/{id}")
    public DeleteMemberResponse deleteMember(@PathVariable("id") Long id) {

        try {
            userService.deleteUser(id);
            return new DeleteMemberResponse(true);
        } catch (Exception e) {
            e.printStackTrace();
            return new DeleteMemberResponse(false);
        }

    }





    @Data
    static class CreateMemberResponse {
        private boolean success;

        public CreateMemberResponse(boolean success) {
            this.success = success;
        }
    }

    @Data
    static class CreateMemberRequest {

        private String name;
        private int age;
    }

    @Data
    static class UpdateMemberResponse {
        private boolean success;

        public UpdateMemberResponse(boolean success) {
            this.success = success;
        }
    }

    @Data
    static class UpdateMemberRequest {

        private String name;
        private int age;
    }

    @Data
    static class DeleteMemberResponse {
        private boolean success;

        public DeleteMemberResponse(boolean success) {
            this.success = success;
        }
    }

}
