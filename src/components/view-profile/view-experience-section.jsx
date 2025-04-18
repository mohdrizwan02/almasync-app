"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Building } from "lucide-react"
import { formatDate } from "@/lib/utils"

export default function ViewExperienceSection({ experience }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <CardTitle>Work Experience</CardTitle>
          <CardDescription>Professional journey</CardDescription>
        </CardHeader>
        <CardContent>
          {experience && experience.length > 0 ? (
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative pl-8 border-l-2 border-muted pb-8 last:pb-0"
                >
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Building className="h-3 w-3 text-primary-foreground" />
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{exp.employmentPosition}</h3>
                  </div>
                  <p className="text-muted-foreground mb-1">{exp.employmentCompany}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="outline">{exp.employmentType}</Badge>
                    <Badge variant="outline">{exp.employmentWorkType}</Badge>
                    {exp.currentlyWorking && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                        Current
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(exp.employmentStartDate)} -{" "}
                    {exp.currentlyWorking ? "Present" : formatDate(exp.employmentEndDate)}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 mr-2" />
                    {exp.employmentLocation}
                  </div>
                  <p className="text-sm">{exp.employmentDescription}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No work experience listed</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
