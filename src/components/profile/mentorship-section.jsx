"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Edit, BookOpen, Users } from "lucide-react"
import { useState } from "react"

export default function MentorshipSection({ profile, mentees, onEdit }) {
  const [availableForMentorship, setAvailableForMentorship] = useState(profile.availableForMentorship)

  const handleToggleMentorship = () => {
    setAvailableForMentorship(!availableForMentorship)
    // Here you would typically update this in the backend
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Mentorship Settings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Mentorship Settings</CardTitle>
            <CardDescription>Configure your mentorship preferences</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium">Available for Mentorship</h4>
              <p className="text-sm text-muted-foreground">Toggle this to show that you're open to mentoring others</p>
            </div>
            <Switch checked={availableForMentorship} onCheckedChange={handleToggleMentorship} />
          </div>

          {profile.mentorshipExperience && (
            <div>
              <h4 className="font-medium mb-1">Mentorship Experience</h4>
              <p className="text-sm">{profile.mentorshipExperience} years</p>
            </div>
          )}

          {profile.mentorshipTopics && profile.mentorshipTopics.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Mentorship Topics</h4>
              <div className="flex flex-wrap gap-2">
                {profile.mentorshipTopics.map((topic, index) => (
                  <Badge key={index} variant="secondary">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mentees */}
      <Card>
        <CardHeader>
          <CardTitle>Your Mentees</CardTitle>
          <CardDescription>Students you are currently mentoring</CardDescription>
        </CardHeader>
        <CardContent>
          {profile.availableForMentorship ? (
            <>
              {mentees && mentees.length > 0 ? (
                <div className="space-y-4">
                  {mentees.map((mentee, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium">{mentee.name}</h4>
                        <p className="text-sm text-muted-foreground">Topic: {mentee.topic}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">{mentee.sessions} sessions</Badge>
                        <Button variant="outline" size="sm">
                          Message
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-2">You don't have any mentees yet</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your profile is set as available for mentorship. Students will be able to request your guidance.
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">You're not available for mentorship</p>
              <p className="text-sm text-muted-foreground mb-4">
                Toggle the "Available for Mentorship" switch to start mentoring others.
              </p>
              <Button variant="outline" onClick={handleToggleMentorship}>
                Become a Mentor
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
