# 기반 이미지 작성, 멀티스테이징 빌드 시작
FROM openjdk:11-jdk as builder

# workdirectory 설정
WORKDIR /app

# buiild.gradle이 들어있는 backend 폴더 현재 디렉토리로 복사
COPY ./backend .

RUN chmod +x ./gradlew
RUN ./gradlew bootJAR

# 멀티스테이징 2단계
FROM openjdk:11-jdk

# 만들어진 jar 파일 복사해오기
COPY --from=builder app/build/libs/*.jar ./app.jar

# 포트번호 설정
EXPOSE 8080

# ENTRYPOINT 명령 지정
ENTRYPOINT ["java","-jar","/app.jar"]





