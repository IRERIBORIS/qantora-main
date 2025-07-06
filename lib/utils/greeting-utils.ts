export function getDetailedGreeting(): { greeting: string; timeOfDay: string } {
  const now = new Date()
  const hour = now.getHours()

  if (hour >= 5 && hour < 12) {
    return { greeting: "Good Morning", timeOfDay: "morning" }
  } else if (hour >= 12 && hour < 17) {
    return { greeting: "Good Afternoon", timeOfDay: "afternoon" }
  } else if (hour >= 17 && hour < 22) {
    return { greeting: "Good Evening", timeOfDay: "evening" }
  } else {
    return { greeting: "Good Night", timeOfDay: "night" }
  }
}

export function getWelcomeMessage(): string {
  return "Welcome Back!"
}
