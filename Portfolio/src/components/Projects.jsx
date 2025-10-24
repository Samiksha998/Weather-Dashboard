import React from 'react'

const projects = [
  {
    title: 'Full-Stack CI/CD Pipeline on Amazon EKS',
    emoji: '🚀',
    desc:
      'Implemented an automated CI/CD pipeline using Jenkins to deploy a containerized full-stack application (React frontend + Go backend) on Amazon EKS.',
    highlights: [
      'Provisioned AWS infrastructure using Terraform (VPC, Subnets, EC2, EKS, IAM roles)',
      'Configured Jenkins pipelines for build, test, and deployment stages',
      'Dockerized frontend and backend applications',
      'Deployed workloads using Kubernetes manifests and exposed services via LoadBalancer',
      'Integrated CloudWatch monitoring for application health checks'
    ]
  },
  {
    title: 'Flask Web Application on Amazon Linux',
    emoji: '⚙️',
    desc:
      'Developed and deployed a simple Python Flask web app hosted on Amazon Linux EC2 instance.',
    highlights: [
      'Configured security groups and firewall rules for secure access',
      'Created a systemd service for automatic startup on reboot',
      'Used NGINX reverse proxy for secure app exposure'
    ]
  },
  {
    title: 'AWS Infrastructure Automation with Terraform',
    emoji: '☁️',
    desc:
      'Created reusable Terraform modules to provision AWS resources such as VPC, EC2, S3, IAM, and RDS for multi-environment setups.',
    highlights: [
      'Parameterized configurations for dev/test/prod environments',
      'Managed Terraform state using S3 backend and DynamoDB table',
      'Implemented IAM least-privilege access control policies'
    ]
  }
]

export default function Projects() {
  return (
    <section id="projects" className="projects card">
      <h2>Featured Portfolio Projects</h2>
      <div className="project-list">
        {projects.map((p) => (
          <article key={p.title} className="project">
            <h3>
              <span className="emoji">{p.emoji}</span> {p.title}
            </h3>
            <p>{p.desc}</p>
            <ul>
              {p.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
