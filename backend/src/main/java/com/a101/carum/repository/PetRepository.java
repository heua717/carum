package com.a101.carum.repository;

import com.a101.carum.domain.pet.Pet;
import com.a101.carum.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.servlet.tags.form.OptionsTag;

import java.util.List;
import java.util.Optional;

public interface PetRepository extends JpaRepository<Pet, Long> {
    Optional<Pet> findPetByYearAndMonthAndUser(Integer year, Integer month, User user);

    Optional<Pet> findByIdAndUser(Long petId, User user);

    List<Pet> findAllByYear(int year);

    List<Pet> findAllByYearAndUser(int year, User user);

    Optional<Pet> findByYearAndMonthAndUser(Integer year, Integer month, User user);
}
