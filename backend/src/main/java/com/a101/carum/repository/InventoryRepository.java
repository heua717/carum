package com.a101.carum.repository;

import com.a101.carum.domain.furniture.Furniture;
import com.a101.carum.domain.inventory.Inventory;
import com.a101.carum.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    List<Inventory> findByUser(User user);

    Optional<Inventory> findByUserAndFurniture(User user, Furniture furniture);

    boolean existsByFurnitureAndUser(Furniture furniture, User user);
}
