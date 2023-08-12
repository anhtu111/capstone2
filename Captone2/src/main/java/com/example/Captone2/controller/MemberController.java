package com.example.Captone2.controller;

import com.example.Captone2.model.security.ResponseObject;
import com.example.Captone2.model.security.model.*;
import com.example.Captone2.response.*;
import com.example.Captone2.respositories.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    private MemberRepository memberRepository;

    @GetMapping("")
    public ResponseEntity<List<MemberResponse>> getMember() {
        List<Member> members = memberRepository.findAll();
        List<MemberResponse> memberResponses = new ArrayList<>();

        members.forEach(member ->
        {
            MemberResponse memberResponse = new MemberResponse();
            memberResponse.setName(member.getName());
            memberResponse.setMemberId(member.getMemberId());
            memberResponse.setAge(member.getAge());
            memberResponse.setImage(member.getImage());
            memberResponse.setPhone(member.getPhone());
            memberResponse.setAccountId(member.getAccountId());
            memberResponse.setDayOfBirth(member.getDayOfBirth());
            memberResponse.setGender(member.getGender());

            List<Membership> memberships = member.getMembershipList();
            List<MemberShipResponse> memberShipResponses =new ArrayList<>();
            for (Membership membership : memberships) {
                MemberShipResponse memberShipResponse = new MemberShipResponse();

                memberShipResponse.setMembershipName(membership.getMembershipName());
                memberShipResponse.setEndDate(membership.getEndDate());
                memberShipResponse.setClassAddress(membership.getClassAddress());
                memberShipResponse.setClassID(membership.getClassID());
                memberShipResponse.setExpireDate(membership.getExpireDate());
                memberShipResponse.setMembershipID(membership.getMembershipID());
                memberShipResponse.setRegisterDate(membership.getRegisterDate());
                memberShipResponse.setDayOfWeek(membership.getDayOfWeek());


                memberShipResponses.add(memberShipResponse);

            }

            List<Schedule> schedules = member.getScheduleList();
            List<ScheduleResponse> scheduleResponses =new ArrayList<>();

            for (Schedule schedule : schedules) {
                ScheduleResponse scheduleResponse = new ScheduleResponse();

                scheduleResponse.setSchedule_ID(schedule.getSchedule_ID());
                scheduleResponse.setTime(schedule.getTime());
                scheduleResponse.setDateOfWeek(schedule.getDateOfWeek());


                scheduleResponses.add(scheduleResponse);

            }

            List<Booking> bookings = member.getBookingList();
            List<BookingResponse> bookingResponses =new ArrayList<>();

            for (Booking booking : bookings) {
                BookingResponse bookingResponse = new BookingResponse();

                bookingResponse.setBookingId(booking.getBookingId());
                bookingResponse.setPrice(booking.getPrice());
                bookingResponse.setDateFrom(booking.getDateFrom());
                bookingResponse.setDateTo(booking.getDateTo());


                bookingResponses.add(bookingResponse);

            }

            List<Review> reviews = member.getReviews();
            List<ReviewsReponse> reviewsReponses =new ArrayList<>();

            for (Review review : reviews) {
                ReviewsReponse reviewsReponse = new ReviewsReponse();

                reviewsReponse.setIdReview(review.getIdReview());
                reviewsReponse.setRate(review.getRate());
                reviewsReponse.setComment(review.getComment());
                reviewsReponse.setTime(review.getTime());


                reviewsReponses.add(reviewsReponse);

            }


            List<EventUser> eventUsers = member.getEventUserList();
            List<EventResponse> eventResponses =new ArrayList<>();

            for (EventUser eventUser : eventUsers) {
                EventResponse eventResponse = new EventResponse();

                eventResponse.setMemberld(eventUser.getMemberld());
                eventResponse.setDecription(eventUser.getDecription());
                eventResponse.setEvenMembertld(eventUser.getEvenMembertld());
                eventResponse.setEvenName(eventUser.getEvenName());
                eventResponse.setDoneTime(eventUser.getDoneTime());
                eventResponse.setStartTime(eventUser.getStartTime());
                eventResponse.setImage(eventUser.getImage());



                eventResponses.add(eventResponse);

            }







            memberResponse.setScheduleResponses(scheduleResponses);
            memberResponse.setMemberShipResponses(memberShipResponses);
            memberResponse.setBookingResponses(bookingResponses);
            memberResponse.setReviewsReponses(reviewsReponses);
            memberResponse.setEventResponses(eventResponses);
            memberResponses.add(memberResponse);



        });


        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                memberResponses
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Member> get(@PathVariable Long id) {

        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                memberRepository.findById(id).get()
        );
    }

    @PutMapping("put/{id}")
    ResponseEntity<ResponseObject> updateMember(@RequestBody Member newMember, @PathVariable Long id) {
        Member updateMember = memberRepository.findById(id)
                .map(Member -> {
                    Member.setMemberId(newMember.getMemberId());
                    Member.setAge(newMember.getAge());
                    Member.setName(newMember.getName());
                    Member.setGender(newMember.getGender());
                    Member.setPhone(newMember.getPhone());
                    Member.setDayOfBirth(newMember.getDayOfBirth());
                    Member.setAccountId(newMember.getAccountId());
                    Member.setImage(newMember.getImage());

                    return memberRepository.save(Member);
                }).orElseGet(() -> {
                    newMember.setMemberId(id);
                    return memberRepository.save(newMember);
                });
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Update Member successfully", updateMember)
        );
    }

    @PostMapping("/insert")
    ResponseEntity<ResponseObject> insertMember (@RequestBody Member newC){
        // content.setId(locationRepositiry.findByLoctionId());
        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                new ResponseObject("Ok", "Insert Member successfully", memberRepository.save(newC))
        );
    }

    @DeleteMapping("delete/{id}")
    ResponseEntity deleteMember(@PathVariable Long id) {
        boolean exists = memberRepository.existsById(id);
        if(exists) {
            memberRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                    new ResponseObject("ok", "Delete member successfully", "")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Access-Control-Allow-Origin","*").body(
                new ResponseObject("failed", "Cannot find member to delete", "")
        );
    }


}
