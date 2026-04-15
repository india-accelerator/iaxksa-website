const ORGANIZATION_ID = "6c0b6c93-c04c-4249-8e89-e6a2ed904db6";
const THESIS_ID = "a8eb393f-c6b3-4807-b49a-c0abdb513b2a";
const THESIS_NAME = "EMC";
const EVALUATION_STAGE = "APPLICATION_RECEIVED";

export const mapStartupStage = (stage) => {
  if (!stage) return "";
  return String(stage).toUpperCase();
};

const normalizeFounded = (v) => {
  if (v === undefined || v === null) return "";
  return String(v).trim();
};

/**
 * New webhook / DB field names (renamed vs legacy nested `startup`):
 * startupIndustryDomain → domains
 * startupSource (inbound state) → sourceType
 * stage → startupStage
 * companyEmail → founderEmail
 * foundedDate → founded
 * ceoLinkedinUrl → founderLinkedin
 *
 * Plus flat copies of the rest of the legacy `startup` payload for sheets / n8n.
 */
export function buildIaxksaNewWebhookPayload(values, context) {
  const { startupSource, sectorValue, thesisValue, howDidYouGetToKnow, channel } =
    context;

  const description = values.description || "";
  const founderEmail = values.ceoEmail || "";

  return {
    // status: "DRAFT",
    organizationId: ORGANIZATION_ID,
    companyEmail: founderEmail,
    name: values.name || "",
    description,
    website: values.website || "",
    thesisId: THESIS_ID,
    thesisName: THESIS_NAME,
    evaluationStage: EVALUATION_STAGE,

    domains: sectorValue || "",
    sourceType: startupSource || "WEBSITE_INBOUND",
    startupStage: mapStartupStage(values.stage || values.startupStage || ""),
    founderEmail,
    founded: normalizeFounded(values.foundedDate || values.foundedIn),
    founderLinkedin: values.ceoLinkedinUrl || "",

    // Legacy `startup` fields (same data as old webhook) — flat for downstream / sheets
    startup_source: "APPLICATION_FORM",
    channel: channel || "",
    howDidYouGetToKnow: howDidYouGetToKnow || "",
    companyGoal: values.companyGoal || "",
    links: values.website || "",
    email: founderEmail,
    startupIndustryDomain: sectorValue || "",
    industry: sectorValue || "",
    thesis: thesisValue || "",
    ceoName: values.ceoName || "",
    ceoPhone: values.ceoPhone || "",
    ceoLinkedinUrl: values.ceoLinkedinUrl || "",
    productDescription: values.productDescription || "",
    revenueDetails: values.revenueDetails || "",
    topClients: values.topClients || "",
    fundingRaised: values.fundingRaised || "",
    ksaPriority: values.ksaPriority || "",
    existingLeads: values.existingLeads || "",
    existingLeadsDetails: values.existingLeadsDetails || "",
    topUseCases: values.topUseCases || "",
    employeeCount: values.employeeCount || "",
    hasSaudiLead: values.hasSaudiLead || "",
    willingToInvest: values.willingToInvest || "",
    dataRoomLink: values.dataRoomLink || "",
    dataRoomGDriveLinkPrimary: values.dataRoomLink || "",
    productUrl: values.productUrl || "",
    legalName: values.legalName || "",
    founders: values.ceoName || "",
    overview: description,
    geographical_address: "",
    stage: mapStartupStage(values.stage || values.startupStage || ""),
  };
}
