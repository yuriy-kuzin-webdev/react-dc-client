import React, { useContext } from "react";
import DcContext from "../contexts/dc-context";
import { Typography } from "@material-ui/core";

export default function Helper() {
  const context = useContext(DcContext);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "80px",
        marginBottom: "80px",
        flexGrow: 1,
      }}
    >
      <Typography component="h2" variant="h4">
        {
          [
            "How to make an appointment ?",
            "Как записаться к специалисту ?",
            "Як записатися до стоматолога ?",
          ][context.languageCode]
        }
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            marginRight: "14px",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: '50px'
          }}
        >
          <h3 style={{ display: "inline" }}>
            {["Step 1", "Шаг 1", "Шаг 1"][context.languageCode]}
          </h3>
          <span>
            {
              [
                "Choose a dentist",
                "Выберите стоматолога",
                "Оберiть стоматолога",
              ][context.languageCode]
            }
          </span>
        </div>
        <div
          style={{
            display: "flex",
            marginRight: "14px",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: '50px'
          }}
        >
          <h3 style={{ display: "inline" }}>
            {["Step 2", "Шаг 2", "Шаг 2"][context.languageCode]}
          </h3>
          <span>
            {
              [
                "Choose a convient date",
                "Выберите удобную дату",
                "Оберiть зручну дату",
              ][context.languageCode]
            }
          </span>
        </div>
        <div
          style={{
            display: "flex",
            marginRight: "14px",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: '50px'
          }}
        >
          <h3 style={{ display: "inline" }}>
            {["Step 3", "Шаг 3", "Шаг 3"][context.languageCode]}
          </h3>
          <span>
            {
              [
                "Wait for manager call",
                "Получите подтверждение от менеджера",
                "Отримайте згоду з менеджером",
              ][context.languageCode]
            }
          </span>
        </div>
      </div>
    </div>
  );
}
