import type { Metadata } from "next";
import LearningHubClient from "./LearningHubClient";

export const metadata: Metadata = {
  title: "Learning Hub — Setwise Digital | Technology Education",
  description: "Start your personalized technology learning journey. Choose a topic, answer a few questions, and get matched with an educator.",
};

export default function LearningHubPage() {
  return <LearningHubClient />;
}
