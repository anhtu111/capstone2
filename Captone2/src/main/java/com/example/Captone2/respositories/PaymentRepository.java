package com.example.Captone2.respositories;

import com.example.Captone2.model.security.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment , Long> {


}
