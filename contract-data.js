// Full text of the EverTech Partnership & Profit-Sharing Agreement,
// broken into articles so it can be rendered on-page AND used to build
// the final merged PDF once all 4 partners have signed.

const PARTNERS = [
  { id: "waheed-gulzar", name: "Waheed Gulzar" },
  { id: "muhammad-ateeb", name: "Muhammad Ateeb" },
  { id: "muhammad-saad-iftikhar", name: "Muhammad Saad Iftikhar" },
  { id: "moqaddas-arooj", name: "Moqaddas Arooj" },
];

const CONTRACT_ARTICLES = [
  {
    title: "1. Definitions",
    body: [
      "\u201cCompany\u201d means EverTech, operating under the domain evertech.live, together with any successor entity into which the business is later incorporated.",
      "\u201cNet Profit\u201d means the gross revenue of the Company, less all reasonable and properly documented business expenses, taxes, and liabilities, for a given accounting period, as evidenced by the Company\u2019s financial records.",
      "\u201cInitial Investment\u201d means any capital contributed by a Partner toward the founding and early operation of the Company, as recorded in Schedule A. As of the Effective Date, no Partner has made any Initial Investment.",
      "\u201cShares\u201d means each Partner\u2019s percentage ownership interest in, and entitlement to the Net Profit of, the Company, as set out in this Agreement. Where the Company is later incorporated as a registered legal entity, \u201cShares\u201d shall also refer to the corresponding equity shares issued in that entity.",
      "\u201cUnderperformance\u201d has the meaning given in Article 8.",
    ],
  },
  {
    title: "2. Formation and Purpose",
    body: [
      "2.1. The Partners have jointly formed the Company to carry out the business of software development, AI automation, and related technical and consulting services, and to pursue its growth for the mutual benefit of all Partners.",
      "2.2. This Agreement governs the relationship among the Partners in respect of ownership, profit distribution, decision-making, and exit, whether the Company continues to operate as an unincorporated partnership or is later incorporated as a formal legal entity.",
    ],
  },
  {
    title: "3. Capital Contributions",
    body: [
      "3.1. As of the Effective Date, no Partner has contributed any Initial Investment toward the Company, as recorded in Schedule A.",
      "3.2. Should any Partner contribute capital to the Company after the Effective Date, such contribution shall only be recognized under this Agreement if agreed in writing and signed by all Partners, and shall be recorded in an updated Schedule A accordingly.",
    ],
  },
  {
    title: "4. Ownership Structure",
    body: [
      "4.1. Subject to the adjustments set out in Article 8 (Underperformance and Forfeiture of Shares), the Partners shall each hold an equal ownership interest in the Company, as follows: Waheed Gulzar \u2014 25%; Muhammad Ateeb \u2014 25%; Muhammad Saad Iftikhar \u2014 25%; Moqaddas Arooj \u2014 25%.",
      "4.2. These Shares represent each Partner\u2019s entitlement to Net Profit under Article 6, and, if the Company is later incorporated, shall form the basis for allocation of formal equity shares in that entity, unless the Partners unanimously agree otherwise in writing.",
    ],
  },
  {
    title: "5. Return of Initial Investment (Priority Distribution)",
    body: [
      "5.1. As of the Effective Date, no Partner has contributed any Initial Investment. Should any Partner contribute capital in the future in accordance with Article 3.2, and the Company subsequently becomes profitable, the first priority for distribution of any available Net Profit shall be the full repayment of that Initial Investment to the contributing Partner(s), before any profit is distributed to the Partners under Article 6.",
      "5.2. Any such repayment shall be of the principal amount only. No interest, mark-up, or additional charge of any kind shall be added to the amount repaid, in accordance with the Islamic prohibition of Riba (interest).",
      "5.3. If more than one Partner contributes Initial Investment, repayment shall be made to each such Partner in proportion to their respective contribution as recorded in Schedule A, unless otherwise agreed in writing by all Partners.",
    ],
  },
  {
    title: "6. Profit Distribution",
    body: [
      "6.1. Following full repayment of any Initial Investment under Article 5 (if applicable), all remaining Net Profit shall be distributed among the Partners in proportion to their respective Shares as set out in Article 4 (or as adjusted under Article 8).",
      "6.2. Profit distributions shall be calculated and made on a schedule to be agreed by all Partners (e.g., quarterly or annually), based on the Company\u2019s financial records, which shall be made reasonably available to all Partners upon request.",
    ],
  },
  {
    title: "7. Loss Sharing",
    body: [
      "7.1. In the event the Company incurs a loss rather than a profit in any given period, such loss shall be borne by each Partner strictly in proportion to their respective capital contribution recorded in Schedule A (or, if no capital has been contributed by any Partner, in proportion to their respective Shares under Article 4), consistent with the Islamic commercial principle that liability for loss follows capital ownership (al-ghunm bil-ghurm).",
      "7.2. No Partner shall be personally liable for losses beyond their own capital contribution to the Company, except in cases of proven fraud, gross negligence, or willful misconduct by that Partner.",
    ],
  },
  {
    title: "8. Underperformance and Forfeiture of Shares",
    body: [
      "8.1. Each Partner\u2019s Shares are granted on the understanding that all Partners will contribute meaningful and ongoing effort toward the Company\u2019s operation and growth. Shares are therefore subject to adjustment as set out below.",
      "8.2. If the other three (3) Partners unanimously agree, in good faith and acting reasonably, that a Partner (the \u201cUnderperforming Partner\u201d) is not contributing a reasonable level of effort to the Company, they shall issue that Partner a written notice (\u201cPerformance Notice\u201d) specifically describing the concerns.",
      "8.3. The Underperforming Partner shall have fourteen (14) days from the date of the Performance Notice (the \u201cCure Period\u201d) to respond and demonstrate satisfactory performance or to remedy the concerns raised.",
      "8.4. If, at the end of the Cure Period, the remaining three (3) Partners unanimously agree that the Underperforming Partner\u2019s performance remains unsatisfactory, that Partner\u2019s Shares shall be forfeited and redistributed equally among the remaining three (3) Partners (i.e., each remaining Partner\u2019s Share shall increase by approximately 8.33%, absent a separate written agreement among the remaining Partners specifying a different allocation).",
      "8.5. A Partner whose Shares are forfeited under this Article shall remain entitled to their proportionate share of any Net Profit that had already been earned and become due prior to the date of forfeiture, and shall remain liable for their proportionate share of any losses incurred prior to that date, but shall have no further claim to future profits, decision-making rights, or involvement in the Company from that date forward.",
      "8.6. This Article shall be exercised in good faith. It is not intended to be used to remove a Partner for reasons unrelated to genuine underperformance, and any Partner who believes this Article is being invoked in bad faith may raise the matter under Article 17 (Dispute Resolution).",
    ],
  },
  {
    title: "9. Roles and Responsibilities",
    body: [
      "9.1. The Partners shall, from time to time, agree among themselves on the specific roles, responsibilities, and areas of ownership each Partner holds within the Company. Such role allocations may be recorded in a separate written schedule and updated by mutual agreement without requiring amendment of this entire Agreement.",
    ],
  },
  {
    title: "10. Decision-Making",
    body: [
      "10.1. Day-to-day operational decisions may be made by the Partner(s) responsible for the relevant area of the business.",
      "10.2. Major decisions \u2014 including but not limited to incurring significant debt, entering into major contracts, changing the Company\u2019s core business activity, admitting a new partner, or amending this Agreement \u2014 shall require the unanimous written consent of all Partners then holding Shares.",
    ],
  },
  {
    title: "11. Islamic (Shariah) Principles Governing This Partnership",
    body: [
      "11.1. Nature of Partnership. This Agreement is structured as a Shirkat-ul-Aqd (contractual partnership), based on mutual consent, equitable participation, and shared risk among the Partners, in accordance with Islamic commercial principles (Fiqh al-Mu\u2019amalat).",
      "11.2. Prohibition of Riba. No amount payable under this Agreement \u2014 including any repayment of Initial Investment under Article 5 \u2014 shall include interest, mark-up, or any additional charge beyond the principal amount contributed. All financial dealings of the Company shall be structured to avoid Riba.",
      "11.3. Halal Business Activity. The Partners agree that the Company shall only engage in lawful (Halal) business activities, and shall not knowingly engage in any business, investment, or financing arrangement involving Riba (interest), Gharar (excessive uncertainty or speculation), Maysir (gambling), or any other activity prohibited under Shariah.",
      "11.4. Amanah (Trust). Each Partner acknowledges that Company funds, assets, and confidential information are held in trust (Amanah) on behalf of all Partners, and undertakes to manage and deal with them honestly, diligently, and transparently.",
      "11.5. Zakat. Each Partner shall remain individually responsible for calculating and paying any Zakat due on their personal share of Company assets and profits, in accordance with their own religious obligation.",
      "11.6. Reconciliation (Sulh). In the event of any dispute among the Partners, the Partners shall first make a sincere and good-faith effort to resolve the matter directly amongst themselves through mutual consultation (Shura) and reconciliation (Sulh) before pursuing the formal dispute resolution process set out in Article 17.",
    ],
  },
  {
    title: "12. Confidentiality",
    body: [
      "12.1. Each Partner shall keep confidential all non-public information relating to the Company\u2019s business, clients, financials, and technical systems, both during their involvement with the Company and after they cease to be a Partner for any reason, except as required by law or with the prior written consent of the other Partners.",
    ],
  },
  {
    title: "13. Non-Competition and Non-Solicitation",
    body: [
      "13.1. While a Partner holds Shares in the Company, and for a period of twelve (12) months after ceasing to hold Shares for any reason, that individual shall not, without the prior written consent of the remaining Partners, directly or indirectly: (a) engage in any business substantially similar to and competitive with the Company\u2019s business; or (b) solicit any client, employee, or contractor of the Company to leave or reduce their engagement with the Company.",
    ],
  },
  {
    title: "14. Intellectual Property",
    body: [
      "14.1. All intellectual property created by any Partner in the course of working on or for the Company \u2014 including but not limited to software, designs, brand assets, workflows, and written content \u2014 shall belong to the Company, and not to any individual Partner personally, regardless of which Partner created it.",
    ],
  },
  {
    title: "15. Voluntary Exit of a Partner",
    body: [
      "15.1. A Partner who wishes to voluntarily withdraw from the Company shall provide at least thirty (30) days\u2019 written notice to the other Partners.",
      "15.2. Upon voluntary exit, the departing Partner\u2019s Shares shall be handled as agreed in writing by all Partners at that time. If the Partners cannot agree, the matter shall be resolved under Article 17 (Dispute Resolution).",
    ],
  },
  {
    title: "16. Restrictions on Transfer of Shares",
    body: [
      "16.1. No Partner may sell, transfer, pledge, or otherwise dispose of any part of their Shares to any third party without the prior written consent of all other Partners.",
    ],
  },
  {
    title: "17. Dispute Resolution",
    body: [
      "17.1. As set out in Article 11.6, the Partners shall first attempt to resolve any dispute through direct, good-faith consultation and reconciliation.",
      "17.2. If a dispute cannot be resolved through mutual consultation within thirty (30) days, the Partners agree to refer the matter to a single mutually agreed arbitrator (preferably one familiar with both Pakistani law and Islamic commercial principles) for binding arbitration, before resorting to formal litigation.",
    ],
  },
  {
    title: "18. Governing Law",
    body: [
      "18.1. This Agreement shall be governed by and construed in accordance with the laws of the Islamic Republic of Pakistan, interpreted, to the fullest extent permitted by law, in harmony with Islamic commercial principles.",
    ],
  },
  {
    title: "19. Amendment",
    body: [
      "19.1. This Agreement may only be amended by a written document signed by all Partners then holding Shares.",
    ],
  },
  {
    title: "20. General Provisions",
    body: [
      "20.1. Entire Agreement. This Agreement (including its Schedules) constitutes the entire understanding among the Partners regarding the subject matter herein, and supersedes any prior oral or written agreements on the same subject.",
      "20.2. Severability. If any provision of this Agreement is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.",
      "20.3. Notices. Any notice required under this Agreement shall be given in writing, by email and/or registered post, to each Partner\u2019s address on file with the Company.",
      "20.4. Counterparts / Electronic Execution. This Agreement has been executed electronically by each Partner via digital signature capture, with each Partner\u2019s identity, address, and CNIC recorded at the time of signing, and the signing date recorded automatically by the system. The Partners agree this electronic execution is binding as between themselves.",
    ],
  },
];
