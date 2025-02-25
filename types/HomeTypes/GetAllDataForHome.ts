import GetAboutMeForUIDTO from "../AboutMeTypes/GetAboutMeForUIDTO";
import GetEducationForUI from "../EducationTypes/GetEducationForUI";
import GetMainForUI from "../MainTypes/GetMainForUI";
import GetProjectForUI from "../ProjectTypes/GetProjectForUI";
import GetSkillForUI from "../SkillTypes/GetSkillForUI";

export default interface GetAllDataForHome{
    main:GetMainForUI,
    aboutMe:GetAboutMeForUIDTO,
    education:GetEducationForUI[],
    skill:GetSkillForUI[],
    project:GetProjectForUI[]
}