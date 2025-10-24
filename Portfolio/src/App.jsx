import React from 'react'
import Header from './components/Header'
import Projects from './components/Projects'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="container">
      <Header />
      <main>
        <section className="about card">
          <h2>About</h2>
          <p>
            I'm a DevOps Engineer passionate about building automated, scalable,
            and secure cloud infrastructure. My work focuses on containerization,
            CI/CD pipelines, and cloud-native deployments using AWS, Terraform,
            Jenkins, Docker, and Kubernetes.
          </p>
          <p>
            I enjoy bridging development and operations to deliver fast,
            reliable, and observable software deployments, ensuring efficiency
            across the full delivery lifecycle.
          </p>
        </section>

        <section className="tech card">
          <h2>Tech Stack</h2>
          <div className="chips">
            {[
              'AWS',
              'Terraform',
              'Jenkins',
              'Docker',
              'Kubernetes',
              'GitHub Actions',
              'Python',
              'Go',
              'ReactJS',
              'Linux',
              'Shell Scripting'
            ].map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        </section>

        <Projects />

        <Contact />
      </main>
      <footer>
        <small>© {new Date().getFullYear()} Samiksha Gurav — DevOps Engineer</small>
      </footer>
    </div>
  )
}
