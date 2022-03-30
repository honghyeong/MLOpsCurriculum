package mlops.mlopsapi.repository;

import lombok.RequiredArgsConstructor;
import mlops.mlopsapi.domain.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class UserRepository{

    private final EntityManager em;

    public Long save(User user) {
        em.persist(user);
        return user.getId();
    }

    public User findOne(Long id) {
        return em.find(User.class, id);
    }

    public List<User> findByName(String name) {
        return em.createQuery("select u from User u where u.name=:name", User.class)
                .setParameter("name", name)
                .getResultList();
    }

    public void delete(User user) {
        em.remove(user);
    }

    public List<User> findAll() {
        return em.createQuery("select u from User u", User.class)
                .getResultList();
    }

}
