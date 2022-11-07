package com.a101.carum.repository;

import com.a101.carum.domain.pet.PetDaily;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetDailyRepository extends JpaRepository<PetDaily, Long> {
}
