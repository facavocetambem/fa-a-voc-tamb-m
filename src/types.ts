export enum Language {
  PT = 'PT',
  EN = 'EN',
  ES = 'ES',
}

export interface TranslationSet {
  navLogo: string;
  navHome: string;
  navMission: string;
  navProjects: string;
  navAiPlanner: string;
  navSupportBoard: string;
  navDonate: string;
  navVolunteer: string;
  
  heroTitle: string;
  heroSubtitle: string;
  heroCTA1: string;
  heroCTA2: string;
  heroStatsTitle: string;
  
  missionTitle: string;
  missionSubtitle: string;
  missionParagraph1: string;
  missionParagraph2: string;
  missionHeading1: string;
  missionParagraph3: string;
  missionHeading2: string;
  missionParagraph4: string;
  missionImpactBadge: string;
  
  statsFamilies: string;
  statsToys: string;
  statsCountries: string;
  statsVolunteers: string;
  
  projectsTitle: string;
  projectsSubtitle: string;
  projectFilterAll: string;
  projectFilterBrazil: string;
  projectFilterGlobal: string;
  projectGoal: string;
  projectRaised: string;
  projectDaysLeft: string;
  projectDonateBtn: string;
  
  donateTitle: string;
  donateSubtitle: string;
  donateMethodNational: string;
  donateMethodInternational: string;
  donatePixCopySuccess: string;
  donatePixButton: string;
  donateInternationalTitle: string;
  donateSelectAmount: string;
  donateCustomAmount: string;
  donateValueToys: string;
  donateValueBaskets: string;
  donateValueEducation: string;
  donateBillingTitle: string;
  donateCardNumber: string;
  donateCardExpiry: string;
  donateCardCVC: string;
  donateCardName: string;
  donateCardPayButton: string;
  donateSuccessTitle: string;
  donateSuccessMsg: string;
  donatePixKeyLabel: string;
  donatePixAccountLabel: string;
  donatePixAccountValue: string;
  donatePixCopied: string;
  
  volunteerTitle: string;
  volunteerSubtitle: string;
  volunteerName: string;
  volunteerEmail: string;
  volunteerPhone: string;
  volunteerMessage: string;
  volunteerRole: string;
  volunteerRoleSelect: string;
  volunteerRoleField: string;
  volunteerRoleDonation: string;
  volunteerRolePromotion: string;
  volunteerSubmit: string;
  volunteerSuccess: string;
  volunteerRecentTitle: string;
}

export interface Campaign {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  category: 'brazil' | 'global';
  goal: number;
  raised: number;
  daysLeft: number;
  image: string;
}

export interface VolunteerSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  message: string;
  date: string;
}
