package com.a101.carum.util;

import com.a101.carum.api.dto.ResGetPetDaily;
import com.a101.carum.domain.pet.PetDaily;
import com.a101.carum.domain.question.FaceType;
import lombok.AllArgsConstructor;


@AllArgsConstructor
public class PetUtils {
    public static class PetDailyUtil extends PetUtils{
        private PetDailyUtil petDailyUtil;
        public static Integer getRandomColor(String str) {
            String[] list = str.split(",");
            return Integer.parseInt(list[(int)(Math.random()*100)%4]);
        }
        public static ResGetPetDaily getFaceType(PetDaily petDaily) {
            return ResGetPetDaily.builder()
                    .face(petDaily.getFace())
                    .color(getRandomColor(petDaily.getColor()))
                    .build();
        }
    }




}
