import svgPaths from "./svg-cgmsokeele";
import imgImage1 from "figma:asset/5157a3182d285c3cf8a0d9346eac2a92890f4fdb.png";

function MainHeader() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start justify-start leading-[0] relative shrink-0 text-[#212529] w-full" data-name="Main Header">
      <div className="css-cf1s1j font-['Open_Sans:Bold',_sans-serif] font-bold relative shrink-0 text-[32px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">Ψηφιακές Υπηρεσίες</p>
      </div>
      <div className="css-cf1s1j font-['Open_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[15px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">Εξυπηρετηθείτε άμεσα και αποτελεσματικά επιλέγοντας μια από τις παρακάτω υπηρεσίες.</p>
      </div>
    </div>
  );
}

function FaSolidFileAlt() {
  return (
    <div className="h-[133px] relative w-[99.75px]" data-name="fa-solid:file-alt">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 133">
        <g clipPath="url(#clip0_2_470)" id="fa-solid:file-alt">
          <path d={svgPaths.p172c1800} fill="var(--fill-0, #B9C0DA)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2_470">
            <rect fill="white" height="133" width="99.75" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Category() {
  return (
    <div className="basis-0 bg-[#f4f5f9] grow h-[220px] min-h-px min-w-px relative rounded-[10px] shrink-0" data-name="Category">
      <div className="overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[13px] h-[220px] items-start justify-start p-[30px] relative w-full">
          <div className="css-uo73c9 font-['Open_Sans:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[#334692] text-[24px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal] whitespace-pre">Αιτήσεις</p>
          </div>
          <div className="css-grneyo font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#212529] text-[0px] text-nowrap">
            <p className="leading-[normal] text-[15px] whitespace-pre">
              <span className="font-['Open_Sans:Regular',_sans-serif] font-normal" style={{ fontVariationSettings: "'wdth' 100" }}>{`Υποβάλετε οποιαδήποτε από τις `}</span>
              <span className="font-['Open_Sans:Bold',_sans-serif] font-bold" style={{ fontVariationSettings: "'wdth' 100" }}>{`79 `}</span>
              <span className="font-['Open_Sans:Regular',_sans-serif] font-normal" style={{ fontVariationSettings: "'wdth' 100" }}>
                {" "}
                <br aria-hidden="true" />
                διαθέσιμες αιτήσεις.
              </span>
            </p>
          </div>
          <div className="absolute flex h-[154.27px] items-center justify-center left-[269px] top-[104.18px] w-[130.77px]">
            <div className="flex-none rotate-[345deg]">
              <FaSolidFileAlt />
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d7dbe9] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function FaSolidCogs() {
  return (
    <div className="h-[120px] relative w-[150px]" data-name="fa-solid:cogs">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 150 120">
        <g clipPath="url(#clip0_2_479)" id="fa-solid:cogs">
          <path d={svgPaths.p346a9d00} fill="var(--fill-0, #B9C0DA)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2_479">
            <rect fill="white" height="120" width="150" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Category1() {
  return (
    <div className="basis-0 bg-[#f4f5f9] grow h-[220px] min-h-px min-w-px relative rounded-[10px] shrink-0" data-name="Category">
      <div className="overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[13px] h-[220px] items-start justify-start p-[30px] relative w-full">
          <div className="css-uo73c9 font-['Open_Sans:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[#334692] text-[24px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal] whitespace-pre">Αναφορές Προβλημάτων</p>
          </div>
          <div className="css-cf1s1j font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#212529] text-[15px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal] whitespace-pre">
              Υποβάλετε αίτημα για εσωτερικά ζητήματα
              <br aria-hidden="true" />
              όπως άδειες, αναφορές βλαβών, κλπ.
            </p>
          </div>
          <div className="absolute flex h-[154.719px] items-center justify-center left-[226.33px] top-[104.18px] w-[175.943px]">
            <div className="flex-none rotate-[345deg]">
              <FaSolidCogs />
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d7dbe9] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function FaSolidExclamationTriangle() {
  return (
    <div className="h-[106.667px] relative w-[120px]" data-name="fa-solid:exclamation-triangle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 120 107">
        <g clipPath="url(#clip0_2_459)" id="fa-solid:exclamation-triangle">
          <path d={svgPaths.p1c2d2980} fill="var(--fill-0, #B9C0DA)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2_459">
            <rect fill="white" height="106.667" width="120" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Category2() {
  return (
    <div className="basis-0 bg-[#f4f5f9] grow h-[220px] min-h-px min-w-px relative rounded-[10px] shrink-0" data-name="Category">
      <div className="overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[13px] h-[220px] items-start justify-start p-[30px] relative w-full">
          <div className="css-uo73c9 font-['Open_Sans:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[#334692] text-[24px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal] whitespace-pre">Αναφορές - Αιτήματα</p>
          </div>
          <div className="css-cf1s1j font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#212529] text-[15px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal] whitespace-pre">Υποβάλετε μία αναφορά στην αρμόδια υπηρεσία.</p>
          </div>
          <div className="absolute flex h-[134.076px] items-center justify-center left-[257.67px] top-[103.94px] w-[143.501px]">
            <div className="flex-none rotate-[345deg]">
              <FaSolidExclamationTriangle />
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d7dbe9] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex gap-5 items-center justify-start relative shrink-0 w-full" data-name="Row">
      <Category />
      <Category1 />
      <Category2 />
    </div>
  );
}

function FaSolidClipboardCheck() {
  return (
    <div className="h-[130px] relative w-[97.5px]" data-name="fa-solid:clipboard-check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 98 130">
        <g clipPath="url(#clip0_2_476)" id="fa-solid:clipboard-check">
          <path d={svgPaths.p5bde900} fill="var(--fill-0, #B9C0DA)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2_476">
            <rect fill="white" height="130" width="97.5" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Category3() {
  return (
    <div className="bg-[#f4f5f9] h-[220px] relative rounded-[10px] shrink-0 w-[419px]" data-name="Category">
      <div className="box-border content-stretch flex flex-col gap-[13px] h-[220px] items-start justify-start overflow-clip p-[30px] relative w-[419px]">
        <div className="css-uo73c9 font-['Open_Sans:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[#334692] text-[24px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[normal] whitespace-pre">Επαλήθευση Εγγράφου</p>
        </div>
        <div className="css-cf1s1j font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#212529] text-[15px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[normal] whitespace-pre">
            {`Επαληθεύστε την εγκυρότητα ενός `}
            <br aria-hidden="true" />
            εγγράφου.
          </p>
        </div>
        <div className="absolute flex h-[150.79px] items-center justify-center left-[270px] top-[93.6px] w-[127.82px]">
          <div className="flex-none rotate-[345deg]">
            <FaSolidClipboardCheck />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d7dbe9] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function FaSolidCalendarDay() {
  return (
    <div className="h-[120px] relative w-[105px]" data-name="fa-solid:calendar-day">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 105 120">
        <g clipPath="url(#clip0_2_473)" id="fa-solid:calendar-day">
          <path d={svgPaths.p299fb000} fill="var(--fill-0, #B9C0DA)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2_473">
            <rect fill="white" height="120" width="105" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Category4() {
  return (
    <div className="bg-[#f4f5f9] h-[220px] relative rounded-[10px] shrink-0 w-[419px]" data-name="Category">
      <div className="box-border content-stretch flex flex-col gap-[13px] h-[220px] items-start justify-start overflow-clip p-[30px] relative w-[419px]">
        <div className="css-uo73c9 font-['Open_Sans:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[#334692] text-[24px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[normal] whitespace-pre">Ραντεβού</p>
        </div>
        <div className="css-cf1s1j font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#212529] text-[15px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[normal] whitespace-pre">
            {`Προγραμματίστε την επίσκεψη στην `}
            <br aria-hidden="true" />
            υπηρεσία μας.
          </p>
        </div>
        <div className="absolute flex h-[143.072px] items-center justify-center left-[258px] top-[94px] w-[132.476px]">
          <div className="flex-none rotate-[345deg]">
            <FaSolidCalendarDay />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d7dbe9] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex gap-5 items-center justify-start relative shrink-0" data-name="Row">
      <Category3 />
      <Category4 />
    </div>
  );
}

function Categories() {
  return (
    <div className="content-stretch flex flex-col gap-5 items-start justify-start relative shrink-0 w-full" data-name="Categories">
      <Row />
      <Row1 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-2.5 items-start justify-start leading-[0] relative shrink-0 w-full">
      <div className="css-dd90mc font-['Open_Sans:Bold',_sans-serif] font-bold relative shrink-0 text-[#c25400] text-[18px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">Προστασία δεδομένων προσωπικού χαρακτήρα</p>
      </div>
      <div className="css-cf1s1j font-['Open_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#212529] text-[13px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">Ο Φορέας, κατ’ εφαρμογή του Γενικού Κανονισμού για την Προστασία των Προσωπικών Δεδομένων (GDPR) ΕΕ 2016/679, σας ενημερώνει ότι η χρήση των δεδομένων σας, θα πραγματοποιηθεί αποκλειστικά για τη διεκπεραίωση της εκάστοτε αίτησής σας, στο πλαίσιο της εκπλήρωσης καθηκόντων που εκτελούνται προς το δημόσιο συμφέρον και κατά την ενάσκηση δημόσιας εξουσίας.</p>
      </div>
    </div>
  );
}

function MainFooter() {
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-start justify-start relative shrink-0 w-full" data-name="Main Footer">
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-1.5px_-0.12%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1300 4">
            <path d="M2 2L1298 2.00011" id="Line 4" stroke="var(--stroke-0, #C25400)" strokeLinecap="round" strokeWidth="3" />
          </svg>
        </div>
      </div>
      <Frame7 />
    </div>
  );
}

function Main() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[60px] items-start justify-start left-[312px] top-[196px] w-[1296px]" data-name="Main">
      <MainHeader />
      <Categories />
      <MainFooter />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-5 items-center justify-start relative shrink-0">
      <div className="bg-center bg-cover bg-no-repeat h-[66px] shrink-0 w-[252px]" data-name="image 1" style={{ backgroundImage: `url('${imgImage1}')` }} />
      <div className="css-pm01us font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[20px] text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">
          {`Ψηφιακή Πύλη `}
          <br aria-hidden="true" />
          Εξυπηρέτησης του Πολίτη
        </p>
      </div>
    </div>
  );
}

function MaterialSymbolsSearchRounded() {
  return (
    <div className="relative shrink-0 size-[25.044px]" data-name="material-symbols:search-rounded">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g id="material-symbols:search-rounded">
          <path d={svgPaths.p4609e40} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function IconsMaterial24X24() {
  return (
    <div className="content-stretch flex gap-2.5 items-center justify-center overflow-clip relative shrink-0 size-6" data-name="Icons - Material - 24x24">
      <MaterialSymbolsSearchRounded />
    </div>
  );
}

function BtnIconHeader() {
  return (
    <div className="bg-[#48599d] content-stretch flex gap-2.5 items-center justify-center relative rounded-[6px] shrink-0 size-12" data-name="Btn - Icon - Header">
      <IconsMaterial24X24 />
    </div>
  );
}

function HeaderSearch() {
  return (
    <div className="content-stretch flex items-start justify-start relative shrink-0" data-name="HeaderSearch">
      <BtnIconHeader />
    </div>
  );
}

function MaterialSymbolsNotificationsRounded() {
  return (
    <div className="relative shrink-0 size-6" data-name="material-symbols:notifications-rounded">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-symbols:notifications-rounded">
          <path d={svgPaths.p539ed00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function IconsMaterial24X25() {
  return (
    <div className="content-stretch flex gap-2.5 items-center justify-center overflow-clip relative shrink-0 size-6" data-name="Icons - Material - 24x24">
      <MaterialSymbolsNotificationsRounded />
    </div>
  );
}

function BtnIconHeader1() {
  return (
    <div className="bg-[#48599d] content-stretch flex gap-2.5 items-center justify-center relative rounded-[6px] shrink-0 size-12" data-name="Btn - Icon - Header">
      <IconsMaterial24X25 />
    </div>
  );
}

function MaterialSymbolsKeyboardArrowDownRounded() {
  return (
    <div className="relative shrink-0 size-6" data-name="material-symbols:keyboard-arrow-down-rounded">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-symbols:keyboard-arrow-down-rounded">
          <path d={svgPaths.p1318a840} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function IconsMaterial24X26() {
  return (
    <div className="content-stretch flex gap-2.5 items-center justify-center overflow-clip relative shrink-0 size-6" data-name="Icons - Material - 24x24">
      <MaterialSymbolsKeyboardArrowDownRounded />
    </div>
  );
}

function BtnHeader() {
  return (
    <div className="bg-[#48599d] box-border content-stretch flex gap-2.5 h-12 items-center justify-center pl-[22px] pr-2.5 py-1.5 relative rounded-[6px] shrink-0" data-name="Btn - Header">
      <div className="css-pm01us font-['Open_Sans:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[15px] text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Πέτρος Ιακώβου</p>
      </div>
      <IconsMaterial24X26 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-2.5 items-center justify-start relative shrink-0">
      <HeaderSearch />
      <BtnIconHeader1 />
      <BtnHeader />
    </div>
  );
}

function MaterialSymbolsCalendarClockRounded() {
  return (
    <div className="relative shrink-0 size-6" data-name="material-symbols:calendar-clock-rounded">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-symbols:calendar-clock-rounded">
          <path d={svgPaths.p373bd080} fill="var(--fill-0, #7483BF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function IconsMaterial24X27() {
  return (
    <div className="content-stretch flex gap-2.5 items-center justify-center overflow-clip relative shrink-0 size-6" data-name="Icons - Material - 24x24">
      <MaterialSymbolsCalendarClockRounded />
    </div>
  );
}

function Frame9() {
  return (
    <div className="box-border content-stretch flex gap-1.5 items-center justify-start px-2.5 py-2 relative shrink-0">
      <IconsMaterial24X27 />
      <div className="css-pm01us font-['Open_Sans:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[15px] text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Τα ραντεβού μου</p>
      </div>
    </div>
  );
}

function MaterialSymbolsLabProfileRounded() {
  return (
    <div className="relative shrink-0 size-6" data-name="material-symbols:lab-profile-rounded">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-symbols:lab-profile-rounded">
          <path d={svgPaths.p12e12d80} fill="var(--fill-0, #7483BF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function IconsMaterial24X28() {
  return (
    <div className="content-stretch flex gap-2.5 items-center justify-center overflow-clip relative shrink-0 size-6" data-name="Icons - Material - 24x24">
      <MaterialSymbolsLabProfileRounded />
    </div>
  );
}

function Frame10() {
  return (
    <div className="box-border content-stretch flex gap-1.5 items-center justify-start px-2.5 py-2 relative shrink-0">
      <IconsMaterial24X28 />
      <div className="css-pm01us font-['Open_Sans:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[15px] text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Οι αιτήσεις μου</p>
      </div>
    </div>
  );
}

function MaterialSymbolsDocsRounded() {
  return (
    <div className="relative shrink-0 size-6" data-name="material-symbols:docs-rounded">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-symbols:docs-rounded">
          <path d={svgPaths.p17611b00} fill="var(--fill-0, #7483BF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function IconsMaterial24X29() {
  return (
    <div className="content-stretch flex gap-2.5 items-center justify-center overflow-clip relative shrink-0 size-6" data-name="Icons - Material - 24x24">
      <MaterialSymbolsDocsRounded />
    </div>
  );
}

function Frame11() {
  return (
    <div className="box-border content-stretch flex gap-1.5 items-center justify-start px-2.5 py-2 relative shrink-0">
      <IconsMaterial24X29 />
      <div className="css-pm01us font-['Open_Sans:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[15px] text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Τα έγγραφά μου</p>
      </div>
    </div>
  );
}

function UserMenu() {
  return (
    <div className="content-stretch flex gap-2.5 items-center justify-start relative shrink-0" data-name="UserMenu">
      <Frame9 />
      <Frame10 />
      <Frame11 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col h-24 items-end justify-between relative shrink-0">
      <Frame4 />
      <UserMenu />
    </div>
  );
}

function HeaderMain() {
  return (
    <div className="bg-[#334692] h-[136px] relative shrink-0 w-full" data-name="HeaderMain">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex h-[136px] items-center justify-between px-[312px] py-[22px] relative w-full">
          <Frame3 />
          <Frame6 />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col items-start justify-start relative shrink-0 w-[1920px]" data-name="Header">
      <HeaderMain />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-0 left-0 right-0 top-[-3px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1920 3">
            <line id="Line 3" stroke="var(--stroke-0, #3B8CB0)" strokeWidth="3" x2="1920" y1="1.5" y2="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Header1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start justify-start left-0 top-0 w-[1920px]" data-name="Header">
      <Header />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-0 left-0 right-0 top-[-3px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1920 3">
            <line id="Line 3" stroke="var(--stroke-0, #3B8CB0)" strokeWidth="3" x2="1920" y1="1.5" y2="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-center flex flex-wrap font-['Open_Sans:Bold',_sans-serif] font-bold gap-[30px] items-center justify-start leading-[0] relative shrink-0 text-[#334692] text-[13px] text-nowrap w-[1296px]">
      <div className="css-uo73c9 relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">Οδηγίες</p>
      </div>
      <div className="css-uo73c9 relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">Σχετικά με το Ψηφιακό Κέντρο Εξυπηρέτησης του Πολίτη</p>
      </div>
      <div className="css-uo73c9 relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">Όροι Χρήσης</p>
      </div>
      <div className="css-uo73c9 relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">Πολιτική Απορρήτου</p>
      </div>
      <div className="css-uo73c9 relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">Επικοινωνία</p>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-end justify-end relative shrink-0">
      <div className="css-cf1s1j font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#212529] text-[11px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">© Copyright 2025 Dataverse - All Rights Reserved</p>
      </div>
    </div>
  );
}

function Frame568() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start justify-start relative shrink-0 w-full">
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-0.5px_-0.04%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1298 2">
            <path d="M1 1H1297" id="Line 6" stroke="var(--stroke-0, #ACB1D1)" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <Frame14 />
    </div>
  );
}

function Frame569() {
  return (
    <div className="content-stretch flex flex-col gap-[60px] items-start justify-start relative shrink-0 w-full">
      <Frame5 />
      <Frame568 />
    </div>
  );
}

function FooterMain() {
  return (
    <div className="bg-[#f4f5fa] box-border content-stretch flex flex-col gap-[30px] h-40 items-start justify-start px-[312px] py-[30px] relative shrink-0" data-name="FooterMain">
      <Frame569 />
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute content-stretch flex flex-col items-start justify-start left-0 top-[1040px]" data-name="Footer">
      <div className="h-0 relative shrink-0 w-[1920px]">
        <div className="absolute bottom-0 left-0 right-0 top-[-3px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1920 3">
            <line id="Line 3" stroke="var(--stroke-0, #334692)" strokeWidth="3" x2="1920" y1="1.5" y2="1.5" />
          </svg>
        </div>
      </div>
      <FooterMain />
    </div>
  );
}

export default function HomeLoggedIn() {
  return (
    <div className="bg-white relative size-full" data-name="Home/ LoggedIn">
      <Footer />
      <Main />
      <Header1 />
    </div>
  );
}