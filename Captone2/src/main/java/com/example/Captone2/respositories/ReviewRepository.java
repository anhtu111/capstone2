package com.example.Captone2.respositories;

import com.example.Captone2.model.security.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Review getById(Long id);
}
