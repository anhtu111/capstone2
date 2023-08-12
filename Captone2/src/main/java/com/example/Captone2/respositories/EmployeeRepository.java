package com.example.Captone2.respositories;

import com.example.Captone2.model.security.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
//   Employee getByEmployee(long EmployeeID);
//
//    @Query("select m from Employee m where m.EmployeeId=:EmployeeId")
//    Employee findByEmployeeId(Long MemberId);
}
