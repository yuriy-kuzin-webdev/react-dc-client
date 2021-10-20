import { createContext, useEffect, useState } from "react";

const DcContext = createContext({
  languageCode: 0,
  setLanguageCode: (code) => {},

  appointments: [],
  clients: [],
  clinics: [],
  clinicInformations: [],
  clinicReviews: [],
  dentists: [],
  dentistInformations: [],
  dentistReviews: [],

  addAppointment: (appointment) => {},
  updAppointment: (appointment) => {},

  addClient: (client) => {},
  updClient: (client) => {},

  addClinicReview: (clinicReview) => {},
  updClinicReview: (clinicReview) => {},
  delClinicReview: (clinicReviewId) => {},

  addDentistReview: (dentistReview) => {},
  updDentistReview: (dentistReview) => {},
  delDentistReview: (dentistReviewId) => {},

  selectedClinic: {},
  selectedDentist: {},

  selectClinic: (clinic) => {},
  selectDentist: (dentist) => {},
});

export function DcContextProvider(props) {
  const api = "http://localhost:31437/api/";

  const [userSelectedClinic, setUserSelectedClinic] = useState({});
  const [userSelectedDentist, setUserSelectedDentist] = useState({});
  const [langCode, setLangCode] = useState(0);
  const [userAppointments, setUserAppointments] = useState([]);
  const [userClients, setUserClients] = useState([]);
  const [userClinics, setUserClinics] = useState([]);
  const [userClinicInformations, setUserClinicInformations] = useState([]);
  const [userClinicReviews, setUserClinicReviews] = useState([]);
  const [userDentists, setUserDentists] = useState([]);
  const [userDentistInformations, setUserDentistInformations] = useState([]);
  const [userDentistReviews, setUserDentistReviews] = useState([]);

  useEffect(() => {
    async function fetchData(setStateCallback, controllerName) {
      let response = await fetch(api + controllerName);
      let data = await response.json();
      setStateCallback(data);
    }
    fetchData(setUserAppointments, "appointments");
    fetchData(setUserClients, "clients");
    fetchData(setUserClinics, "clinics");
    fetchData(setUserClinicInformations, "clinicinfoes");
    fetchData(setUserClinicReviews, "clinicreviews");
    fetchData(setUserDentists, "dentists");
    fetchData(setUserDentistInformations, "dentistinfoes");
    fetchData(setUserDentistReviews, "dentistreviews");
  }, []);

  function addData(data, controllerName, setStateCallback) {
    fetch(api + controllerName, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setStateCallback((prev) => {
          return prev.concat(json);
        });
      });
  }
  function updData(data, dataId, controllerName, setStateCallback) {
    fetch(api + controllerName + "/" + dataId, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      setStateCallback((prev) => {
        return prev.map((d) => {
          return d[Object.keys(d)[0]] === dataId ? data : d;
        });
      });
    });
  }
  function delData(dataId, controllerName, setStateCallback) {
    fetch(api + controllerName + "/" + dataId, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setStateCallback((prev) => {
          return prev.filter((data) => data[Object.keys(data)[0]] !== dataId);
        });
      });
  }

  function selectClinicHandler(clinic) {
    setUserSelectedClinic(clinic);
  }
  function selectDentistHandler(dentist) {
    setUserSelectedDentist(dentist);
  }

  const context = {
    languageCode: langCode,
    setLanguageCode: (code) => {
      setLangCode(code);
    },

    appointments: userAppointments,
    clients: userClients,
    clinics: userClinics,
    clinicInformations: userClinicInformations,
    clinicReviews: userClinicReviews,
    dentists: userDentists,
    dentistInformations: userDentistInformations,
    dentistReviews: userDentistReviews,

    addAppointment: (appointment) => { addData(appointment, "appointments", setUserAppointments) },
    updAppointment: (appointment) => { updData(appointment, appointment.id, "appointments", setUserAppointments) },

    addClient: (client) => { addData(client, "clients", setUserClients) },
    updClient: (client) => { updData(client, client.id, "clients", setUserClients) },

    addClinicReview: (clinicReview) => { addData(clinicReview, "clinicreviews", setUserClinicReviews) },
    updClinicReview: (clinicReview) => { updData(clinicReview, clinicReview.id ,"clinicreviews", setUserClinicReviews) },
    delClinicReview: (clinicReviewId) => { delData(clinicReviewId, "clinicreviews", setUserClinicReviews) },

    addDentistReview: (dentistReview) => { addData(dentistReview, "dentistreviews", setUserDentistReviews) },
    updDentistReview: (dentistReview) => { updData(dentistReview, dentistReview.id, "dentistreviews", setUserDentistReviews) },
    delDentistReview: (dentistReviewId) => { delData(dentistReviewId, "dentistreviews", setUserDentistReviews) },

    selectedClinic: userSelectedClinic,
    selectedDentist: userSelectedDentist,

    selectClinic: selectClinicHandler,
    selectDentist: selectDentistHandler,
  };

  return (
    <DcContext.Provider value={context}>{props.children}</DcContext.Provider>
  );
}

export default DcContext;
