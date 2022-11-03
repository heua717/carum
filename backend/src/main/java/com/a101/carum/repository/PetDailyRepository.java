package com.a101.carum.repository;

import com.a101.carum.domain.pet.PetDaily;
import com.a101.carum.domain.pet.PetType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PetDailyRepository extends JpaRepository<PetDaily, Long> {
    Optional<PetDaily> findPetDailyByPetTypeAndEmotion(PetType petType, String Emotion);
}
