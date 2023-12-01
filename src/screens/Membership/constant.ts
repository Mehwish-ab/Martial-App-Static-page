export interface CreateMembershipInitialValues {
  MembershipTitle: string;
  MembershipStartDate: string;
  MembershipEndDate: string;
  Visibility: string[];
  MembershipSubscriptionType: string[];
  MembershipFee: string | number;
  MinimumStudents: string | number;
  DailySubscriptionFees: string;
  WeeklySubscriptionFees: string;
  MonthlySubscriptionFees: string;
  AnnuallySubscriptionFees: string;
  AllowToStudentCancle: string;
  RefundFeeDate: string;
  BookingCancellationStart: string;
  BookingCancellationEnd: string;
  CancellationCharges: string;
  Accommodate: string;
  Description: string;
  Agreement: string;
  termCondition: string;
  Liabilitywaivers: string;
}
