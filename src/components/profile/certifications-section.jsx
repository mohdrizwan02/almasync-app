"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Award, Calendar, ExternalLink } from "lucide-react"
import { formatDate } from "@/lib/utils"

export default function CertificationsSection({ certifications, onEdit }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Certifications</CardTitle>
            <CardDescription>Your professional certifications</CardDescription>
          </div>
          <Button onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Add Certification
          </Button>
        </CardHeader>
        <CardContent>
          {certifications && certifications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border rounded-lg p-4 relative"
                >
                  <Button variant="ghost" size="sm" className="absolute top-2 right-2" onClick={() => onEdit(index)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <div className="flex items-start mb-3">
                    <Award className="h-5 w-5 mr-2 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">{cert.certificationName}</h3>
                      <p className="text-sm text-muted-foreground">{cert.certificationOrganization}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Issued: {formatDate(cert.certificationIssueDate)}</span>
                    </div>
                    {cert.certificationExpirationDate && (
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Expires: {formatDate(cert.certificationExpirationDate)}</span>
                      </div>
                    )}
                    {cert.certificationId && (
                      <div className="text-sm">
                        <span className="font-medium">Credential ID:</span> {cert.certificationId}
                      </div>
                    )}
                  </div>

                  {cert.certificationUrl && (
                    <a
                      href={cert.certificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-primary hover:underline mb-3"
                    >
                      View Certificate <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  )}

                  {cert.certificationAssociatedSkills && cert.certificationAssociatedSkills.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-1">Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {cert.certificationAssociatedSkills.map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
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
              <p className="text-muted-foreground mb-4">No certifications added yet</p>
              <Button variant="outline" onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Add Your First Certification
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
