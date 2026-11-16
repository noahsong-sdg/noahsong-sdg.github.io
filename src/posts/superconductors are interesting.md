---
publishedDate: "2026-11-16"
draft: false
---

## I Introduction

My prima facie understanding of superconductors consisted of two possible futures: one where someone finds an ambient temperature superconducting material and ushers in a new epoch of possible technologies, and the other where superconductors are relegated to niche academic applications and see limited industry adoption.

As often is with naive and dilettante opinions, this is false! applied superconductivity is faced with a *cost* problem: making the material, turning it into a machine, and keeping it running. Novel materials can help, but better manufacturing processes are already chipping away and making good progress.

This is really exciting, because making superconductors easier to buy and build with could remove a bottleneck for a nontrivial portion of the near-term tech tree. IE: compact fusion machines like [CFS's SPARC](https://cfs.energy/technology), much more capable / compact particle accelerators via [SRF](https://iarc.fnal.gov/superconducting-rf-accelerators/), commercial free-electron lasers like [xLight](https://www.xlight.com/technology), mass drivers like [SpaceX's proposed lunar launcher](https://www.spacex.com/updates), maglevs, &c. [^application-scope] 

But superconductivity was discovered in 1911. Why are superconductors just now seeing growing application? i mostly answer this in the form of the technological chronology, but we might find generalizable lessons in bridging new physics to industry!

![Concept rendering of the SPARC tokamak, with human figures for scale](/files/posts/superconductors-are-interesting/Attachments/superconductors-are-really-really-cool/mit-sparc-concept-2020.jpg)

*SPARC, 2020. looks like something out of star wars!*[^fig-sparc]

![Cutaway of NASA’s partially superconducting HEMM aircraft motor](/files/posts/superconductors-are-interesting/Attachments/superconductors-are-really-really-cool/nasa-hemm-cutaway.png)

*NASA’s HEMM aircraft-motor design, with superconducting rotor coils and an integrated cryocooler. The rotor coils carry steady current and make a strong field in a small space. That field gives the motor more torque for the same current in the surrounding copper windings. On an airplane, the bet is that the motor can shrink enough to pay for the weight of its refrigerator. Artist’s rendering of a machine under development. Image: [NASA](https://www.nasa.gov/eap-technology/electric-machines/hemm/).*

## II How superconductors work

### Resistance and refrigeration

Superconductivity was discovered in mercury in 1911 and has two characteristic properties.[^sc-discovery] The first is the one you're probably aware of:  superconductors conduct super-ly! vis, below a critical temperature, and within its field and current limits, the material can carry steady current with no electrical resistance.[^basics]

> [!info]- What are the electrons doing?
> In conventional superconductors, interactions with lattice vibrations allow electrons to form correlated Cooper pairs. The pairs participate in a collective quantum state as bosons. The microscopic pairing mechanism in cuprates such as REBCO is different, but we don't need to understand it to know how their vortices behave

Power loss can get so exorbitant that one can save money with superconductors, even including cooling costs. IE: a [free-electron laser](https://andercot.substack.com/p/free-electron-lasers-and-the-birth) accelerates electrons, then sends them through alternating magnetic fields so they wiggle and radiate. The original LCLS used a copper accelerator, but LCLS-II uses superconducting niobium cavities, allowing it to sustain accelerating fields and deliver a much higher pulse rate![^fel-mechanism][^lcls]

![An LCLS-II-HE cryomodule delivered to SLAC from Jefferson Lab](/files/posts/superconductors-are-interesting/Attachments/superconductors-are-really-really-cool/slac-cryomodule-2024.jpg)

*An LCLS-II-HE cryomodule arriving at SLAC, March 2024.*[^fig-slac]

The cavities have currents flowing in their walls.  [One accelerator lecture](https://uspas.fnal.gov/materials/21onlineSBU/Cryo/12%20-%20SRF%20Cavities.pdf#page=6) compares copper at 300 K with niobium at 2 K: at the same geometry and fields, its example gives about *500,000 times less cavity-wall heating*. The refrigerator needs about 750 watts of electricity to remove one watt at 2 K. Even after the refrigeration tax, this part of the power budget is hundreds of times smaller.[^srf-economics]

![Design layout of a compact superconducting industrial electron accelerator](/files/posts/superconductors-are-interesting/Attachments/superconductors-are-really-really-cool/jlab-compact-srf.png)

*What a smaller industrial accelerator could look like: cryocoolers sit on the cryomodule, while magnets steer the beam toward the processing window. The superconducting RF cavity is inside the cryomodule. cool applications for compact particle accelerators [here](https://iarc.fnal.gov/superconducting-rf-accelerators/) Design illustration: [Jefferson Lab](https://www.jlab.org/partnerships/blastpfas).*

![Artist’s rendering of the laser uplink from Earth to Psyche](/files/posts/superconductors-are-interesting/Attachments/superconductors-are-really-really-cool/jpl-psyche-optical-link.png)

*a laser uplink to Psyche. On the return trip, the Hale Telescope fed the incoming light to a superconducting nanowire detector. A single absorbed photon could drive part of a wire resistive and produce a pulse the receiver could count. [Artist’s rendering by NASA/JPL-Caltech](https://www.jpl.nasa.gov/news/nasas-laser-comms-demo-makes-deep-space-record-completes-first-phase/). [The detector at Palomar](https://science.nasa.gov/photojournal/dsocs-superconducting-nanowire-single-photon-detector/).*

### The Meissner effect and Type II superconductors

The other characteristic property is the *Meissner effect*: in the Meissner state, the material expels magnetic field from its bulk. Currents near the surface provide the screening.

![Magnetic field through a normal sample and excluded from a sample in the Meissner state](/files/posts/superconductors-are-interesting/Attachments/superconductors-are-really-really-cool/meissner-minimal-2026.png)

*The Meissner effect: field expelled from the bulk.*[^srf-fundamentals]

A regular wire produces heat quadratically with current, so doubling the current at the same resistance gives four times the heating. So if we want to make a powerful electromagnet, there are some very obvious limitations. 

![Front view of a SCMAGLEV vehicle and the forces exerted by its guideway coils](/files/posts/superconductors-are-interesting/Attachments/superconductors-are-really-really-cool/scmaglev-lift.jpg)

*On JR Central’s SCMAGLEV, the moving train’s superconducting magnets induce currents in coils along the guideway. The lower poles repel and the upper poles attract. Both forces help lift the train. [Illustration by JR Central](https://www.us-jia.com/media).*

We can make very strong fields with ordinary conductors, but keeping them on takes a lot of power. The National MagLab's 45 T hybrid magnet gets 33.5 T from a resistive insert and 11.5 T from a superconducting outer magnet (this is a lot). It needs *30 megawatts*, for a bore just *32 millimeters* across.[^maglab] Even when the field is held steady, the resistive winding keeps producing heat. We have to keep paying for the electricity and pumping that heat out.

![A live frog levitating inside the bore of a powerful electromagnet](/files/posts/superconductors-are-interesting/Attachments/superconductors-are-really-really-cool/frog-diamagnetic-levitation.jpg)

*A frog levitating at about 16 T — in a resistive magnet!*[^frog-levitation]

Ideally, we're able to use superconductors for magnets, too, so we can get sustained fields, less winding heat, and (maybe) smaller machines. Kamerlingh Onnes was already dreaming of a 10 T superconducting magnet in 1913. Distressingly, he found that a B field could destroy the superconducting phase :([^onnes-magnets]

Superconductivity is a distinct phase, with temperature and B-field boundaries. This superconducting phase is histrionic and, for what is called Type I materials, even relatively small B fields kill the phase, returning the material to the normality. (Screening B field costs energy; at the critical field, that cancels the energy saved by being superconducting.) But not all hope is lost!

It turns out for *some* superconductors, it's energetically favorable for the material to admit cylindrical vortices through the material to let B field go through the material. These are Type II superconductors, with two critical fields demarcating the vortex state.

Picture a tiny core where superconductivity is suppressed, surrounded by circulating supercurrent. Each vortex allows one quantum of magnetic flux, $\Phi_0=h/(2e)$. At 10 T, an ideal vortex array has neighbors about 15 nanometers apart.[^vortex][^vortex-transport]

![Magnetic field penetrating as vortices, with an enlarged view of a vortex core and circulating supercurrent](/files/posts/superconductors-are-interesting/Attachments/superconductors-are-really-really-cool/vortices-v2.svg)

*A vortex: core scale $\xi$, screening scale $\lambda$. AI-generated schematic.*[^vortex]

Below the lower critical field, $H_{c1}$, the material stays in the Meissner state, screening magnetic field from its bulk. Between that and the upper critical field, $H_{c2}$, it admits vortices while remaining superconducting between their cores. Above $H_{c2}$, bulk superconductivity is lost. That middle region is what lets us build high-field superconducting magnets. For comparison, lead, a familiar Type I superconductor, works below about 7.2 K and has a critical field of only about 0.08 T even near absolute zero.[^type-i-example]

![Published magnetization curves and field–temperature phase diagrams for Type I and Type II superconductors](/files/posts/superconductors-are-interesting/Attachments/superconductors-are-really-really-cool/jha-2019-fig1.webp)

*Type I and Type II: magnetization (A), field–temperature diagrams (B).*[^industry-family]

great! now we can take a type II superconductor (NbTi, niobium–tin / Nb₃Sn, or REBCO are common magnet conductors) with room for error along current, field, and temperature. but if we try to turn on our power supply, we'll get more problems: our material will still heat!

why did this happen? well, it turns out that the vortices can move, and when we apply the current, it shuffles the vortices around, dissipating energy. The current exerts a sideways force on each vortex; moving magnetic flux generates an electric field along the current, so the power supply is doing work that ends up as heat.[^vortex-transport] we need some way of *pinning* the vortices to one spot.

### Flux pinning

if we create defects in our material, it costs less energy for the vortex to be on the defect than otherwise. The defect is called a *pinning center*: it takes force to pull the vortex away. Stronger pinning can therefore let us carry more current before the vortices move and produce unacceptable losses.[^pinning]

![Scanning SQUID-on-tip magnetic microscopy of a single vortex in a lead film](/files/posts/superconductors-are-interesting/Attachments/superconductors-are-really-really-cool/embon-2015-fig1.jpg)

*A vortex in a thin lead film at 4.2 K; this specimen supports vortices, unlike the bulk Type I lead example above. These are magnetic-field measurements and calculations static field (a, c), driven response (b, g), calculations (d–f). Embon et al., Fig. 1.*[^fig-embon]

this is almost unbelievable! We're engineering defects into the material so that quantized magnetic vortices stay where we want them, which lets us carry more current. And we have to reproduce the useful structure over hundreds of kilometers: the MIT/CFS model coil alone used *270 km of REBCO tape*.[^tfmc] 

So finding a material that remains superconducting in a strong field only gets us part of the way. We also have to make the structure that holds the vortices still, over enough length to wind a magnet.

These limits interact each other. Turning up the magnet’s current also raises the field on its conductor, which generally lowers the current it can carry without unacceptable losses; warming it reduces that capacity too. [^operating-margin]



![SR2S concept spacecraft surrounded by superconducting magnetic shielding](/files/posts/superconductors-are-interesting/Attachments/superconductors-are-really-really-cool/sr2s-shield-concept.jpg)

*The SR2S project studied superconducting magnets around a spacecraft to deflect charged cosmic radiation. Image © Roberto Battiston, via [European Commission / SR2S](https://cordis.europa.eu/article/id/166027-shields-up-for-a-manned-mission-to-mars).*
## III REBCO tape

The copper-oxide superconductors discovered in 1986 offered higher operating temperatures, but brought a new set of manufacturing problems. REBCO (rare-earth barium copper oxide, a major family of high-temperature superconducting tapes) lets us see why a better temperature limit didn’t immediately give us easy-to-use wire.[^history-cuprates]

REBCO is a ceramic, so it breaks easily. to make it easier to deal with, we can grow a thin layer of it on a metal strip.  The metal lets us handle and wind the tape, but the ceramic layer is still fragile.[^industry-family][^strain]

![Electron microscopy showing the layers and a crack in REBCO tape](/files/posts/superconductors-are-interesting/Attachments/superconductors-are-really-really-cool/lu-2026-tape-cross-section.png)

*REBCO tape cross-section, including a delamination crack. Lu et al., Fig. 3.*[^lu-tape]

The substrate carries mechanical loads, the buffers provide a template for crystal growth, the REBCO carries superconducting current, and the metal coating helps carry current and heat when something goes wrong. [^industry-family][^industry-superpower]

![Exploded layer diagram of a SuperPower coated conductor](/files/posts/superconductors-are-interesting/Attachments/superconductors-are-really-really-cool/superpower-tape-layers.png)

*The layers of a [SuperPower tape](https://www.superpower-inc.com/specification.aspx).*

So: 
- grow a good crystal on metal filament. 
- make a film with a commensurate template (poorly aligned grain boundaries restrict current)
- create the defects that hold vortices in place
- do so at a pace that isnt [10 centimeters per hour](https://www.fujikura.co.jp/en/company/history/odyssey/vol-05/phase-3/) — the speed of Fujikura’s early continuous buffer-deposition equipment, completed at the end of fiscal 1992. That was just the template; they still had to grow the superconductor on it![^fujikura-history]

Fujikura figured out how to align the template in 1991. Ten years later it reported ten meters of wire. Then the lengths started doubling much faster: 100 meters in 2004, 200 in 2005, and 503.5 meters of 5 mm tape carrying 174.8 amps end to end (349.6 amps per centimeter of width) in 2008. One change was to enlarge the ion source that made the template. The new equipment could coat 500 meters at five meters an hour, fifty times the speed of the early machine. Fujikura started selling the wire in 2009.[^fujikura-history]

people take different approaches at each step in the process, resulting in products with vastly different performance profiles. here are some examples:
## IV some choices in the manufacturing process

### Film 

Which route is best? Well, what are we building? A power cable might run near liquid-nitrogen temperature in a relatively weak field; a fusion magnet might run around 20 K in a field of many tesla. More field means more vortices to hold still, and warming the tape makes pinning less effective. [^industry-family][^wire] 

In 2023 SuNAM described running two machines for grid applications, growing the film by evaporation followed by a controlled reaction. For higher fields it was setting up a different process: pulsed laser deposition, or PLD.[^film-suppliers]

![Section through the EcoSwing wind generator showing its cold rotor and copper stator](/files/posts/superconductors-are-interesting/Attachments/superconductors-are-really-really-cool/ecoswing-rotor-cutaway.jpg)

*Where would you put the expensive tape in a wind turbine? EcoSwing wound its rotor with REBCO and kept copper in the stator. The cold head and insulating vacuum fit inside the generator. [Bergen et al., Fig. 8](https://doi.org/10.1088/1361-6668/ab48d6)*

So factories are improving two things at once: how much accepted tape they make, and how much current that tape can carry.

![Flowchart from customer specification through REBCO tape production to an assembled and tested magnet](/files/posts/superconductors-are-interesting/Attachments/superconductors-are-really-really-cool/rebco-manufacturing-flow.svg)

## V magnet engineering

after we produce the tape, working it into something usable is almost as difficult. If part of the winding spuriously becomes resistive, called a *quench*, it can heat that region and damage the magnet. to avoid this, people use cooling, copper stabilization, and safe discharge paths.[^protection][^hts-protection]

The magnetic field stores energy, and switching off the power supply doesn’t make the current disappear instantly. Protection has to remove that energy or spread its dissipation before a small part of the winding overheats.[^stored-energy]

turns out some magnets reach higher currents after a few quenches! This is called *training*. Tiny movements can cause hot spots, so repeated ramps can let the winding settle into a more stable arrangement. [^training][^wilson-motion]

![Measured quench-training current of the IHEP superconducting undulator prototype](/files/posts/superconductors-are-interesting/Attachments/superconductors-are-really-really-cool/wei-2022-fig9.jpg)

*An NbTi/Cu IHEP undulator during training at 4.2 K. Wei et al., Fig. 9.*[^fig-wei]

There are clever ways around faults, but they have tradeoffs. A no-insulation winding lets current bypass a resistive turn through its neighbors. That helps protection but obviously makes things more complicated! In the MIT/CFS model coil's intentional quench test, local damage still occurred.[^tfmc]

![Post-quench photograph of a model-coil winding beside a simulated temperature distribution](/files/posts/superconductors-are-interesting/Attachments/superconductors-are-really-really-cool/hartwig-2023-fig8.png)

*Quench damage (a); simulated temperature (b), from an intentionally triggered test of a model coil not optimized for quench resilience. Hartwig et al., Fig. 8.*[^fig-hartwig]

## VI some reflections

REBCO dates from the 1980s, but in 1992 the template went down at ten centimeters an hour, and no order would have fixed that by building more of the same machine. The ten-year clock starts when a buyer can write a spec and a supplier can fail it in an informative way. From 2018 to the 10,000 km order is eight years.[^supply-contract] 

two thoughts on this: first, working with superconductors requires specialized knowledge in a panoply of domains: magnet engineering, material science, mechanical engineering, cryogenics, power electronics, and vacuum science &c &c. frontier models will amortize this. 

this might mean that the spikiness of AI will also make firms' tech stacks spiky, because they no longer need to agglomerate large numbers of different domain experts to make specialized parts. 

![Conventional 5.4 metre wind generator beside the 4 metre EcoSwing generator](/files/posts/superconductors-are-interesting/Attachments/superconductors-are-really-really-cool/ecoswing-generator-pair.jpg)

*Same turbine, same 3.6 MW rating. The permanent-magnet generator on the left measured 5.4 m across. Its superconducting replacement on the right measured 4 m and ran on the Danish grid. Four meters was the team’s design limit. At that diameter they could transport the generator more easily and fit the stator into the equipment that impregnates its windings with resin. [Bergen et al., Fig. 17](https://doi.org/10.1088/1361-6668/ab48d6), [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).*

second, once the requirements of the wire became known, ppl then optimized against those benchmarks and very quickly produce new technologies at scale. progress happens once there are those who can specify what precisely they want. saying that the impossible is necessary forces solutions outside of the current paradigm, either from people outside of the field that can introduce exogenous solutions, or people intra-domain who are forced to think in different ways

this is that old wisdom that asking good questions is harder than knowing the right answer. it seems like generally knowing what you want turns out to be really powerful! this is more easily seen in the micro (career/life decisions) but seems to direct the macro, as well. in other words: when you desire the impossible, be specific!

[^tevatron-alloy]: Judy Jackson, [“Down to the Wire,” *Beam Line*, Spring 1993](https://news.fnal.gov/wp-content/uploads/2017/11/beam-line-sc-magnets-tevatron.pdf), p. 19. 

![Rear view of NASA’s N3-X concept aircraft showing a row of fans across the trailing edge](/files/posts/superconductors-are-interesting/Attachments/superconductors-are-really-really-cool/n3x-aft-fans.jpg)

*What an airplane might look like if the engines and fans could go in different places. On NASA’s proposed N3-X, generators at the wingtips supply superconducting motors driving sixteen fans across the back of the aircraft. [Artist’s rendering by NASA](https://www.nasa.gov/eap-aircraft-concepts/n3-x/).*


## Appendix — cost curves 

MIT/CFS (a buyer of tape) reported that average tape procurement cost per meter fell almost 40% between early 2018 and mid-2021 as its model-coil program bought larger volumes. A program that needed a new magnet also helped make its material cheaper.[^tfmc-cost]

![Indexed production-cost, selling-price and procurement-price trends for REBCO](/files/posts/superconductors-are-interesting/Attachments/superconductors-are-really-really-cool/rebco-cost-trends.svg)

*astra made this plot. each series starts at 100. Different products and periods: changes, not comparable price levels.*[^sst-cost-old][^sst-cost-new][^tfmc-cost]

Shanghai's reported average production cost fell from *262 to 74.22 RMB per meter* between 2022 and 2025, about 72%. These are accounting averages across a changing product mix, not the cost of making an unchanged tape specification. Its selling price didn't follow the same path: the 2025 average rose as its sales shifted toward higher-performance tape. So falling production costs don't automatically mean a buyer gets the same percentage discount.[^sst-cost-new]

Caveat: Sps a new pinning structure doubles usable current at an operating point while keeping price per meter unchanged. The conductor cost per unit of current halves. We'd need roughly half as much tape for the same aggregate current capacity, before accounting for changes to the cable and winding. *Making the right defects can ergo be a cost reduction*, even if making a meter of tape costs exactly the same. 


[^application-scope]: [xLight technology overview](https://www.xlight.com/technology); [SpaceX updates](https://www.spacex.com/updates), lunar manufacturing and mass-driver proposal. These company plans do not establish commercial operation or a superconducting conductor bill of materials. [Marathon](https://www.marathonfusion.com/) describes fusion fuel processing and plasma centrifuges.
[^fig-sparc]: SPARC concept rendering, 2020. T. Henderson, CFS/MIT-PSFC, via [MIT News](https://news.mit.edu/2021/MIT-CFS-major-advance-toward-fusion-energy-0908).
[^sc-discovery]: Nobel Prize, [Heike Kamerlingh Onnes: facts](https://www.nobelprize.org/prizes/physics/1913/onnes/facts/), discovery of zero resistance in mercury in 1911. For further history, see [History of superconductivity](https://en.wikipedia.org/wiki/History_of_superconductivity).
[^basics]: [DOE, “Superconductivity”](https://www.energy.gov/science/doe-explainssuperconductivity).
[^bcs]: Jean Delayen, [SRF Fundamentals, USPAS 2015](https://uspas.fnal.gov/materials/15Rutgers/1_SRF_Fundamentals.pdf), especially pp. 49–51 on pairing and the coherent state. The callout describes conventional pairing; it does not assume that the same microscopic mechanism explains REBCO.
[^fel-mechanism]: SLAC, [LCLS overview](https://lcls.slac.stanford.edu/overview); V. Ayvazyan et al., [*First operation of a Free-Electron Laser generating GW power radiation at 32 nm wavelength*, SLAC-PUB-12114 (2006)](https://www.slac.stanford.edu/pubs/slacpubs/12000/slac-pub-12114.pdf#page=4), introduction on PDF p. 4: undulator radiation, microbunching and coherent amplification.
[^lcls]: SLAC, [LCLS-II](https://lcls.slac.stanford.edu/lcls-ii), original copper linac and superconducting design comparison; [December 9, 2025 performance report](https://www6.slac.stanford.edu/news/2025-12-09-new-world-record-lcls-approaches-100000-pulses-second-path-million), 33 kHz user experiments and 93 kHz demonstration. One MHz is the design target, not an achieved rate claimed here.
[^fig-slac]: Photo: Jacqueline Ramseyer Orrell/SLAC. LCLS-II-HE cryomodule arriving from Jefferson Lab, March 2024; [SLAC source](https://www6.slac.stanford.edu/news/2024-09-27-new-upgrade-will-supercharge-atomic-vision-worlds-most-powerful-x-ray-laser).
[^srf-economics]: R. Dhuley, [*Superconducting Radiofrequency Cavities*, USPAS 2021](https://uspas.fnal.gov/materials/21onlineSBU/Cryo/12%20-%20SRF%20Cavities.pdf), slides 6–7. Ratios in the text are illustrative arithmetic using the lecture's assumptions, not a total-project cost estimate.
[^srf-fundamentals]: Jean Delayen, [*SRF Fundamentals*, USPAS 2015](https://uspas.fnal.gov/materials/15Rutgers/1_SRF_Fundamentals.pdf), especially PDF pp. 5, 7–8 and surface-energy discussion. The embedded phase diagrams are reproduced from Jha and Matsumoto (2019), credited in their caption.
[^maglab]: National MagLab, [45 T, 32 mm bore hybrid magnet](https://nationalmaglab.org/user-facilities/dc-field/magnets-instruments/hybrid-magnets/45-tesla-cell-15/), facility specifications checked November 6, 2026.
[^frog-levitation]: M. V. Berry and A. K. Geim, [“Of flying frogs and levitrons,” European Journal of Physics 18 (1997), 307–313](https://doi.org/10.1088/0143-0807/18/4/012). Diamagnetic levitation requires a suitable field gradient as well as field strength. Photo apparatus and attribution: [Wikimedia Commons file record](https://commons.wikimedia.org/wiki/File:Frog_diamagnetic_levitation.jpg).
[^onnes-magnets]: A. Ballarino, [“Superconducting materials for application to magnets,” CERN lecture](https://indico.cern.ch/event/717796/contributions/2949588/attachments/1714479/2765344/Lecture_Ballarino.pdf), historical discussion of Onnes's 1913 magnet proposal; D. van Delft and P. Kes, [“The discovery of superconductivity,” Physics Today 63(9), 38 (2010)](https://doi.org/10.1063/1.3490499), discovery of magnetic-field suppression.
[^vortex]: C. Chen et al., [“Revealing the Microscopic Mechanism of Elementary Vortex Pinning in Superconductors,” *Physical Review X* 14, 041039 (2024)](https://doi.org/10.1103/PhysRevX.14.041039), Fig. 1. See also Delayen's mixed-state discussion.
[^vortex-transport]: John R. Clem, [“Theory of flux cutting and flux transport at the critical current of a type-II superconducting cylindrical wire,” Phys. Rev. B 83, 214511 (2011)](https://doi.org/10.1103/PhysRevB.83.214511), introduction and §II; [accepted manuscript](https://link.aps.org/accepted/10.1103/PhysRevB.83.214511). For a triangular array, spacing is [2Φ₀/(√3 B)]^(1/2), about 15.5 nm at 10 T. This is an ideal-array calculation, not a measurement of a particular conductor.
[^type-i-example]: [USPAS, Conditions for Superconductivity (2021), Type I critical-temperature and field table](https://uspas.fnal.gov/materials/21onlineSBU/Cryo/2021%20USPAS%20Lecture%209.pdf); lead: approximately 7.2 K and 80.3 mT. This example does not establish a universal upper bound on Type I transition temperatures.
[^industry-family]: A. K. Jha and K. Matsumoto, [REBCO thin films and nanocomposites, Frontiers in Physics 7, 82 (2019)](https://doi.org/10.3389/fphy.2019.00082), coated-conductor construction, growth methods and pinning. RE denotes the rare-earth-site element; YBCO is the yttrium member. Process acronyms describe different stages, not mutually exclusive complete production lines.
[^pinning]: Los Alamos, [artificial pinning explanation](https://cnls.lanl.gov/~charlesr/vortexperiodic.html); A. Llordés et al., [nanostrain-induced pinning, *Nature Materials* (2012)](https://www.nature.com/articles/nmat3247).
[^fig-embon]: L. Embon et al., [Probing dynamics and pinning of single vortices in superconductors at nanometer scales (2015), Fig. 1](https://doi.org/10.1038/srep07598), [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/), unaltered. Panels (a, c): static field; (b, g): response to alternating current; (d–f): calculations.
[^tfmc]: Z. S. Hartwig et al., [*The SPARC Toroidal Field Model Coil Program*](https://arxiv.org/abs/2308.12301), published in IEEE Transactions on Applied Superconductivity (2024). The 2021 test reached 20.1 T peak on conductor at 20 K; this is not the field at a plasma axis.
[^operating-margin]: S. Prestemon and S. Gourlay, [USPAS superconducting magnet lecture (2018)](https://uspas.fnal.gov/materials/18MSU/U16-2018.pdf), pp. 4–6 and 15: critical surface, conductor peak field and operating/load-line margin.
[^history-cuprates]: U.S. Department of Energy, [DOE Explains…Superconductivity](https://www.energy.gov/science/doe-explainssuperconductivity), discovery of copper-oxide high-temperature superconductors in 1986. The distinction here is between material families and their engineering requirements, not a claim that superconductors had no practical uses before REBCO.
[^strain]: [*Critical current degradation of REBCO coated conductor tapes caused by multiple cracks under tensile loading*, Superconductivity 15 (2025), 100185](https://doi.org/10.1016/j.supcon.2025.100185).
[^lu-tape]: J. Lu et al., [“Delamination in Large REBCO Coils,” arXiv:2610.09308 (October 7, 2026)](https://arxiv.org/abs/2610.09308), Fig. 3, PDF p. 3. Preprint; cross-sectional SEM and TEM of damaged tape. [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).
[^industry-superpower]: SuperPower, [November 2022 manufacturer brochure](https://iss2023wlg.jp/wp/wp-content/uploads/2023/07/SPI-flyer-11-2022.pdf), IBAD/MOCVD construction and zirconium additions. Process description is the manufacturer's, not an independent cost comparison.
[^fujikura-history]: Fujikura, [Odyssey, phase 3](https://www.fujikura.co.jp/en/company/history/odyssey/vol-05/phase-3/), describes the 10 cm/hour *intermediate-layer deposition* rate of its early continuous IBAD equipment; [product history](https://www.fujikura.co.jp/en/products/superconductors/history/) supplies the later wire-length and sales milestones. The early rate is not finished-tape output. For the 1986 discovery, see [ETH Library's Bednorz history](https://library.ethz.ch/sammlungen-und-archive/kurzportraets/bednorz-georg.html). These milestones describe this manufacturer's route, not the whole industry's progress.
[^wire]: Sakamoto, [“Characteristics of Superconducting Wire from SuperPower Inc.” (2026)](https://www.jstage.jst.go.jp/article/jcsj/61/5/61_232/_article/-char/en).
[^film-suppliers]: [Fujikura](https://indico.cern.ch/event/1168385/contributions/5356084/), [Faraday](https://www.faradaygroup.com/en/company/) and [Shanghai Superconductor](https://indico.cern.ch/event/1347361/contributions/6356213/) already use PLD: laser pulses remove material from a target, supplying the growing film. [SuperPower](https://iss2023wlg.jp/wp/wp-content/uploads/2023/07/SPI-flyer-11-2022.pdf) and [MetOx](https://static1.squarespace.com/static/5cb4aca9ebfc7f3a47763237/t/63b346d4dcfeba07f200198b/1672693462813/METOX_CompanySynopsis2023.pdf) use MOCVD, reacting precursor vapors at the heated tape. [AMSC](https://www.sec.gov/Archives/edgar/data/880807/000143774926018542/amsc20260331_10k.htm) uses a [chemical-coating route](https://ir.amsc.com/static-files/71b29b33-64c1-4b55-865b-4522e7a5d699).
[^protection]: CERN Courier, [“Safeguarding the superconducting magnets”](https://cerncourier.com/a/safeguarding-the-superconducting-magnets/). The 50 MJ example is illustrative arithmetic, not a named magnet specification.
[^hts-protection]: Zgour et al., [*Quench Protection in Insulated REBCO Conductors: Design Optimization and Fast Detection via REBCO SQD* (2026)](https://arxiv.org/abs/2603.15244), IEEE Transactions on Applied Superconductivity 36(5), pp. 1–5. Modeling study of insulated conductors; the no-insulation model-coil figure addresses a different protection architecture.
[^stored-energy]: CERN Courier, [Safeguarding the superconducting magnets](https://cerncourier.com/a/safeguarding-the-superconducting-magnets/): inductive current decay, stored magnetic energy and protection.
[^training]: M. Marchevsky, [*Understanding training in superconducting accelerator magnets using acoustic emission diagnostics* (2022)](https://arxiv.org/abs/2203.08871); Stoynev, Baldini and Feher, [magnet-training experiment (2023)](https://arxiv.org/abs/2301.11278).
[^wilson-motion]: Martin N. Wilson, *Superconducting Magnets* (Oxford University Press, 1983), printed pp. 74 and 85 (PDF pp. 90 and 101 in the supplied scan). Worked estimate at 6 T and initial 4.2 K, with winding current density $4\times10^8\ \mathrm{A/m^2}$ and operation at 90% of critical current; sudden motion of approximately $1/3\ \mu\mathrm m$ deposits about $750\ \mathrm{J/m^3}$. This is not a universal allowable movement or a REBCO-specific threshold.
[^fig-wei]: J. Wei et al., [Journal of Synchrotron Radiation 29 (2022), Fig. 9](https://doi.org/10.1107/S1600577522006166), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), unaltered.
[^fig-hartwig]: Z. S. Hartwig et al., [The SPARC Toroidal Field Model Coil Program, Fig. 8](https://arxiv.org/abs/2308.12301), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), unaltered. Photograph: intentional 31.5 kA open-circuit quench; simulation: 30 kA, 170 seconds.
[^srf-reuse]: A. Burrill et al., [*Vertical Test Results for the LCLS-II 1.3 GHz First Article Cavities*, IPAC2017, pp. 1153–1154](https://inspirehep.net/files/00a7485d9eae3788e47b9b0e66a26d06), vendor qualification and first-article results. Existing fabrication experience waived that part of initial vendor qualification, not the subsequent whole-process acceptance tests. Nitrogen-doping qualification and sixteen first articles per vendor remained; revised electropolishing and heat treatment improved early performance. This documents reused work, not a measured dollar saving.
[^srf-flux-transfer]: A. Palczewski et al., [LINAC2016, MOPLR026](https://proceedings.jacow.org/linac2016/papers/moplr026.pdf), pp. 199–202, production niobium within existing specifications and inadequate flux expulsion; D. Gonnella et al., [Industrialization of the nitrogen-doping preparation for SRF cavities for LCLS-II, NIM A 883 (2018), pp. 143–150](https://inspirehep.net/files/6c4e0627d1348bd3be93a087afe3a0ee), qualification material versus production inputs and corrective treatment. Not all vendor problems had the same cause; the paper also documents process-execution problems.
[^srf-lot-adaptation]: D. Gonnella et al., [Industrial cavity production: lessons learned to push the boundaries of nitrogen-doping, SRF2019](https://lss.fnal.gov/archive/2019/conf/fermilab-conf-19-763-sqms-td.pdf), pp. 1203–1204; J. Maniscalco et al., [SRF2023, pp. 876–879](https://lss.fnal.gov/archive/2023/conf/fermilab-conf-23-789-sqms-td.pdf), material-lot characterization, heat-treatment selection and imperfect prediction from samples/proxies. Interim production evidence, not a final installed-system yield or evidence of existing AI capability.
[^frib-adaptation]: FRIB, [High Rigidity Spectrometer Conceptual Design Report (2019), §3.5](https://frib.msu.edu/sites/default/files/_files/pdfs/HRS-CDR112119_v2.pdf), explicitly minimizes magnet design varieties to reduce nonrecurring engineering costs. Targeted primary passage verified. The AI implication is conditional; this report does not quantify an automatable share of modern magnet costs.
[^tfmc-cost]: Z. S. Hartwig et al., [The SPARC Toroidal Field Model Coil Program (2024), Fig. 9 and conclusion](https://publikationen.bibliothek.kit.edu/1000166953/151963422#page=13): almost 40% reduction in average REBCO procurement cost per meter between early 2018 and mid-2021, attributed to large-volume procurement. This is purchasing evidence, not a direct measurement of supplier manufacturing cost or an isolated causal learning rate.
[^sst-cost-old]: Shanghai Superconductor, [November 2025 prospectus, printed p. 209](https://static.sse.com.cn/stock/disclosure/announcement/c/202511/002081_20251115_VZTZ.pdf): 2022–2024 unit-price and unit-cost table. See also its [exchange inquiry response, section 7](https://static.sse.com.cn/stock/disclosure/announcement/c/202511/002081_20251115_8UJU.pdf). Figures are company-reported accounting unit costs and average selling prices, not an unchanged-specification price index; 2025 half-year data in this older document are not used as full-year figures.
[^sst-cost-new]: Shanghai Superconductor, [March 2026 prospectus, printed pp. 205–206](https://static.sse.com.cn/stock/disclosure/announcement/c/202603/002081_20260331_MYR9.pdf#page=206), 2023–2025 unit-price, unit-cost and margin table; [identical document mirror](https://qxb-pdf-osscache.qixin.com/AnBaseinfo/6dfeead152d14fe7dcdbb33801252b67.pdf). The company attributes the 2025 average-price rebound to the reduced sales share of cheaper, lower-performance tape. Author calculations from the annual costs: 71.67% reduction over 2022–2025; annual reductions approximately 46.9%, 33.2%, 20.1%. Nominal RMB, not inflation-adjusted. Product mix prevents interpreting these averages as constant-quality costs.
[^supply-contract]: Fujikura, [September 30, 2026 supply-agreement announcement](https://www.fujikura.co.jp/en/news/pressrelease/20260930cfsarc1km.html): more than 10,000 km of HTS tape for CFS's ARC program, with manufacturing expansion. Contracted future supply, not a quantity verified as delivered.
[^cfs-rounds]: After decades of publicly funded fusion research, Eni invested $50 million in CFS in 2018. MIT and CFS demonstrated the 20 T model coil in September 2021. Later that year CFS raised over $1.8 billion in its Series B to build SPARC and scale up magnet production. [MIT on federal research, Eni’s investment and the magnet demonstration](https://news.mit.edu/2018/mit-newly-formed-company-launch-novel-approach-fusion-power-0309); [MIT on the 20 T test](https://news.mit.edu/2021/MIT-CFS-major-advance-toward-fusion-energy-0908); [CFS Series B announcement](https://cfs.energy/news-and-media/commonwealth-fusion-systems-closes-1-8-billion-series-b-round/).
