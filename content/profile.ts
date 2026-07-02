// Contact email and phone are intentionally NOT stored here. Messages are
// delivered through the /contact form, whose recipient lives in the
// CONTACT_EMAIL environment variable (see .env.example), so the address is
// never committed to the public repo or shipped to the client.
export const profile = {
  name: "Aiham AlRawashdeh",
  role: "Full-Stack Developer & Digital Marketer",
  location: "Amman, Jordan",
  timezone: "Asia/Amman" as const,
  pitch: "I spot what's broken, then I build what fixes it.",
  resumeUrl: "/Aiham AlRawashdeh CV.pdf",
  socials: {
    linkedin: "https://www.linkedin.com/in/ayham-alrawashdeh",
  },
} as const;
