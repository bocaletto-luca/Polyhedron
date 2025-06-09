"use strict";

    // TAB NAVIGATION
    function openTab(evt, tabName) {
      const tabcontents = document.getElementsByClassName("tabcontent");
      for (let i = 0; i < tabcontents.length; i++) {
        tabcontents[i].style.display = "none";
        tabcontents[i].classList.remove("active");
      }
      const tablinks = document.getElementsByClassName("tablinks");
      for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
      }
      document.getElementById(tabName).style.display = "block";
      document.getElementById(tabName).classList.add("active");
      evt.currentTarget.classList.add("active");
    }
    document.getElementById("defaultTab").click();

    /* ---------- CALCULATOR FUNCTIONS ---------- */
    function calculateValues() {
      const type = document.getElementById("polyType").value;
      const edge = parseFloat(document.getElementById("edgeLen").value);
      if (isNaN(edge) || edge <= 0) {
        document.getElementById("calcResult").innerHTML = "<p>Please enter a valid positive edge length.</p>";
        return;
      }
      let volume, area, formula;
      switch (type) {
        case "cube":
          volume = Math.pow(edge, 3);
          area = 6 * Math.pow(edge, 2);
          formula = "Volume = a³, Surface Area = 6a²";
          break;
        case "tetrahedron":
          volume = Math.pow(edge, 3) / (6 * Math.sqrt(2));
          area = Math.sqrt(3) * Math.pow(edge, 2);
          formula = "Volume = a³/(6√2), Surface Area = √3·a²";
          break;
        case "octahedron":
          volume = (Math.sqrt(2) / 3) * Math.pow(edge, 3);
          area = 2 * Math.sqrt(3) * Math.pow(edge, 2);
          formula = "Volume = (√2/3)·a³, Surface Area = 2√3·a²";
          break;
        case "dodecahedron":
          volume = ((15 + 7 * Math.sqrt(5)) / 4) * Math.pow(edge, 3);
          area = 3 * Math.sqrt(25 + 10 * Math.sqrt(5)) * Math.pow(edge, 2);
          formula = "Volume = ((15+7√5)/4)·a³, Surface Area = 3√(25+10√5)·a²";
          break;
        case "icosahedron":
          volume = (5 * (3 + Math.sqrt(5)) / 12) * Math.pow(edge, 3);
          area = 5 * Math.sqrt(3) * Math.pow(edge, 2);
          formula = "Volume = [5(3+√5)/12]·a³, Surface Area = 5√3·a²";
          break;
        default:
          volume = Math.pow(edge, 3);
          area = 6 * Math.pow(edge, 2);
          formula = "Volume = a³, Surface Area = 6a²";
      }
      
      const resultHTML = `<p><strong>Polyhedron:</strong> ${capitalizeFirstLetter(type)}</p>
                          <p><strong>Edge Length:</strong> ${edge}</p>
                          <p>${formula}</p>
                          <p><strong>Computed Volume:</strong> ${volume.toFixed(4)}</p>
                          <p><strong>Computed Surface Area:</strong> ${area.toFixed(4)}</p>`;
      document.getElementById("calcResult").innerHTML = resultHTML;
    }
    
    function capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    /* ---------- QUIZ FUNCTIONS ---------- */
    let quizPoly, quizEdge, quizType, quizAnswer;
    
    function generateQuiz() {
      // Randomly choose one of the five polyhedra
      const polyhedra = ["cube", "tetrahedron", "octahedron", "dodecahedron", "icosahedron"];
      quizPoly = polyhedra[Math.floor(Math.random() * polyhedra.length)];
      // Random edge length between 0.5 and 5.0
      quizEdge = (Math.random() * 4.5 + 0.5).toFixed(2);
      // Randomly choose whether to ask for volume or area.
      quizType = Math.random() < 0.5 ? "volume" : "area";
      const edge = parseFloat(quizEdge);
      let vol, ar;
      switch(quizPoly) {
        case "cube":
          vol = Math.pow(edge, 3);
          ar = 6 * Math.pow(edge, 2);
          break;
        case "tetrahedron":
          vol = Math.pow(edge, 3) / (6 * Math.sqrt(2));
          ar = Math.sqrt(3) * Math.pow(edge, 2);
          break;
        case "octahedron":
          vol = (Math.sqrt(2) / 3) * Math.pow(edge, 3);
          ar = 2 * Math.sqrt(3) * Math.pow(edge, 2);
          break;
        case "dodecahedron":
          vol = ((15 + 7 * Math.sqrt(5)) / 4) * Math.pow(edge, 3);
          ar = 3 * Math.sqrt(25 + 10 * Math.sqrt(5)) * Math.pow(edge, 2);
          break;
        case "icosahedron":
          vol = (5 * (3 + Math.sqrt(5)) / 12) * Math.pow(edge, 3);
          ar = 5 * Math.sqrt(3) * Math.pow(edge, 2);
          break;
      }
      quizAnswer = quizType === "volume" ? vol : ar;
      const questionHTML = `<p>Compute the <strong>${quizType}</strong> of a ${capitalizeFirstLetter(quizPoly)} with edge length ${quizEdge}.</p>`;
      document.getElementById("quizQuestion").innerHTML = questionHTML;
      document.getElementById("quizFeedback").innerHTML = "";
      document.getElementById("quizAnswer").value = "";
    }
    
    function checkQuiz() {
      const userAns = parseFloat(document.getElementById("quizAnswer").value);
      const feedbackDiv = document.getElementById("quizFeedback");
      if (isNaN(userAns)) {
        feedbackDiv.innerHTML = "<p>Please enter a valid number.</p>";
        return;
      }
      // Allow a relative error of 5%
      if (Math.abs(userAns - quizAnswer) / Math.abs(quizAnswer) < 0.05) {
        feedbackDiv.innerHTML = "<p style='color: green;'>Correct!</p>";
      } else {
        feedbackDiv.innerHTML = `<p style='color: red;'>Incorrect. The correct answer is approximately ${quizAnswer.toFixed(4)}.</p>`;
      }
    }
