"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Calendar } from "lucide-react";

export default function ViewEducationSection({ education }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
          <CardDescription>Academic background</CardDescription>
        </CardHeader>
        <CardContent>
          {education && education.length > 0 ? (
            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative pl-8 border-l-2 border-muted pb-8 last:pb-0"
                >
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <GraduationCap className="h-3 w-3 text-primary-foreground" />
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">
                      {edu.educationDegree} in {edu.educationFieldOfStudy}
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-1">
                    {edu.educationInstitution}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    {edu.educationStartYear} - {edu.educationEndYear}
                  </div>
                  {edu.educationGrade && (
                    <p className="text-sm mb-2">Grade: {edu.educationGrade}</p>
                  )}
                  {edu.educationDescription && (
                    <p className="text-sm mb-3">{edu.educationDescription}</p>
                  )}
                  {edu.educationAssociatedSkills &&
                    edu.educationAssociatedSkills.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-1">
                          Skills Acquired:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {edu.educationAssociatedSkills.map((skill, idx) => (
                            <Badge key={idx} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No education details listed
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
