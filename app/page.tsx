"use client";

import { useState } from "react";

const config = {
  company: "RoofFlow Roofing",
  phone: "(555) 014-ROOF",
  areas: "Dallas • Fort Worth • Plano • Frisco • McKinney",
};

function track(name: string, properties?: Record<string, unknown>) {
  const whop = (window as typeof window & { whop?: { track?: (n: string, p?: Record<string, unknown>) => void } }).whop;
  whop?.track?.(name, properties);
}

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [estimate, setEstimate] = useState({ name: "", email: "", phone: "", service: "Inspection", message: "" });

  const submitEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    track("estimate_requested", { service: estimate.service });
    const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(estimate) });
    setSubmitted(response.ok);
  };

  return <main>
    <header><div className="container nav"><a className="brand" href="#top">Roof<span>Flow</span></a><nav className="navlinks"><a href="#services">Services</a><a href="#area">Service Area</a><a href="#reviews">Reviews</a><a href="#estimate">Estimate</a></nav><a className="btn btn-primary" href="#estimate">Get an Estimate</a></div></header>

    <section className="hero" id="top"><div className="container hero-grid"><div><span className="eyebrow">Licensed • Local • Built to Last</span><h1>Your roof protects everything. We protect your roof.</h1><p>{config.company} delivers dependable repairs, replacements and inspections with clear pricing, financing options and workmanship built for the long haul.</p><div className="actions"><a className="btn btn-primary" href="#estimate">Request an Estimate</a><a className="btn btn-light" href="#services">Explore Services</a></div><div className="proof"><span>✓ Free estimates</span><span>✓ Financing available</span><span>✓ Workmanship focused</span></div></div><div className="visual"><div className="roof-card"><div className="roof-top"><div className="roof-line"/><div className="roof-house"/><div className="roof-body"/></div><div className="dashboard"><div className="dash-row"><div className="metric"><small>Active projects</small><strong>24</strong></div><div className="metric"><small>On-time</small><strong>98%</strong></div><div className="metric"><small>Rating</small><strong>4.9★</strong></div></div></div></div></div></div></section>

    <section className="section" id="services"><div className="container"><div className="section-head"><span className="eyebrow">Roofing services</span><h2>One trusted team from inspection to final invoice.</h2><p className="muted">Choose the service you need today. Our workflow is designed to make the next step obvious and the project easy to follow.</p></div><div className="cards"><article className="card"><h3>Roof Repair</h3><p className="muted">Targeted repairs for leaks, storm damage, flashing, shingles and other issues.</p><a className="btn btn-light" href="#pricing" onClick={() => track("service_viewed", { service: "repair" })}>View service</a></article><article className="card"><h3>Roof Replacement</h3><p className="muted">Full replacement planning with material choices, project scheduling and clear scope.</p><a className="btn btn-light" href="#pricing" onClick={() => track("service_viewed", { service: "replacement" })}>View service</a></article><article className="card"><h3>Roof Inspection</h3><p className="muted">A focused inspection to understand roof condition before you commit to a project.</p><a className="btn btn-light" href="#pricing" onClick={() => track("service_viewed", { service: "inspection" })}>View service</a></article></div></div></section>

    <section className="section" id="pricing"><div className="container"><div className="section-head"><span className="eyebrow">Simple starting points</span><h2>Start with an inspection, deposit the project, or choose a flat-rate repair.</h2></div><div className="cards"><article className="card"><h3>Roof Inspection</h3><div className="price">$149 <small>one-time</small></div><p className="muted">Professional inspection starting point.</p><button className="btn btn-primary" onClick={() => { track("service_viewed", { service: "inspection", plan: "inspection" }); location.href = "/checkout?plan=inspection"; }}>Book inspection</button></article><article className="card"><h3>Project Deposit</h3><div className="price">$500 <small>one-time</small></div><p className="muted">Secure the project and begin the job workflow.</p><button className="btn btn-primary" onClick={() => { track("deposit_started", { amount: 500 }); location.href = "/checkout?plan=deposit"; }}>Start project</button></article><article className="card"><h3>Flat-Rate Repair</h3><div className="price">$1,250 <small>starting</small></div><p className="muted">A flat-rate service option for qualifying repairs.</p><button className="btn btn-primary" onClick={() => { track("service_viewed", { service: "flat_rate_repair" }); location.href = "/checkout?plan=repair"; }}>Choose repair</button></article></div></div></section>

    <section className="section area" id="area"><div className="container"><div className="section-head"><span className="eyebrow">Service area</span><h2>Local coverage. Professional execution.</h2><p className="muted">Serving {config.areas}. Ask about your location when requesting an estimate.</p></div><div className="cards"><article className="card"><h3>Financing</h3><p className="muted">Eligible customers can explore available financing options at checkout when offered by the merchant.</p></article><article className="card"><h3>Project visibility</h3><p className="muted">From deposit through completion, the job workflow is designed around clear next steps and final billing.</p></article><article className="card"><h3>Built for homeowners</h3><p className="muted">Straightforward service choices, estimate requests and payment options without unnecessary friction.</p></article></div></div></section>

    <section className="section" id="reviews"><div className="container"><div className="section-head"><span className="eyebrow">Trust</span><h2>What customers want from a roofing company.</h2></div><div className="cards"><div className="review"><div className="stars">★★★★★</div><p>“Clear communication, clean work and no surprises.”</p><strong>— Homeowner, Dallas</strong></div><div className="review"><div className="stars">★★★★★</div><p>“The team explained what actually needed to be done.”</p><strong>— Homeowner, Frisco</strong></div><div className="review"><div className="stars">★★★★★</div><p>“Professional from inspection through completion.”</p><strong>— Homeowner, Plano</strong></div></div></div></section>

    <section className="section" id="estimate"><div className="container estimate"><div><span className="eyebrow">Request an estimate</span><h2>Tell us what your roof needs.</h2><p className="muted">Send a few details. Your request is captured as a lead so the team can follow up.</p><p className="muted">Prefer to call? <strong>{config.phone}</strong></p></div><form className="form" onSubmit={submitEstimate}><label>Name<input required value={estimate.name} onChange={e => setEstimate({...estimate,name:e.target.value})}/></label><label>Email<input required type="email" value={estimate.email} onChange={e => setEstimate({...estimate,email:e.target.value})}/></label><label>Phone<input required value={estimate.phone} onChange={e => setEstimate({...estimate,phone:e.target.value})}/></label><label>Service<select value={estimate.service} onChange={e => setEstimate({...estimate,service:e.target.value})}><option>Inspection</option><option>Repair</option><option>Replacement</option></select></label><label>Tell us about the project<textarea value={estimate.message} onChange={e => setEstimate({...estimate,message:e.target.value})}/></label><button className="btn btn-dark" type="submit">{submitted ? "Estimate request sent ✓" : "Request an Estimate"}</button></form></div></section>

    <footer className="footer"><div className="container">© 2026 {config.company} • Roofing template powered by Whop</div></footer>
  </main>;
}
