// Get table body
const tbody = document.querySelector('#dataTable tbody');
tbody.innerHTML = sessionStorage.tableData || tbody.innerHTML;
function save() {
  sessionStorage.tableData = tbody.innerHTML;
}

// ===== DELETE FUNCTIONALITY =====
document.querySelector('.delete').onclick = () => {
  document.getElementById('popupContainer').style.display = 'flex';
};
document.getElementById('cancelDelete').onclick = () => {
  document.getElementById('popupContainer').style.display = 'none';
};
document.getElementById('confirmDelete').onclick = () => {
  const checked = document.querySelectorAll('tbody input[type="checkbox"]:checked');
  
  if (checked.length > 0) {
    checked.forEach(box => box.closest('tr').remove());
  } else {
    tbody.innerHTML = '';
  }
  save();
  document.getElementById('popupContainer').style.display = 'none';
};

// Select all checkbox
document.querySelector('thead input[type="checkbox"]').onclick = function() {
  document.querySelectorAll('tbody input[type="checkbox"]').forEach(box => {
    box.checked = this.checked;
  });
};

// ===== ROW DELETE (Three dots) =====
function showPopup(button) {
  button.nextElementSibling.style.display = "block";
}
function hidePopup(button) {
  button.parentNode.style.display = "none";
}
function deleteRow(button) {
  button.closest('tr').remove();
  save();
}

// ===== SEARCH =====
document.getElementById('searchInput').onkeyup = function() {
  const search = this.value.toLowerCase();
  document.querySelectorAll('#dataTable tbody tr').forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(search) ? '' : 'none';
  });
};

// ===== ADD NEW ROW =====
document.getElementById('campaignForm').onsubmit = function(e) {
  e.preventDefault();
  
  tbody.innerHTML += `
    <tr>
      <td class="text-center">
        <div class="d-flex justify-content-center align-items-center gap-2">
          <input type="checkbox" class="form-check-input">
          <span class="status-dot"></span>
        </div>
      </td>
      <td>${campaignName.value}</td>
      <td>${campaignType.value}</td>
      <td>${campaignTrigger.value}</td>
      <td>${yesno.value}</td>
      <td>${activeFrom.value}</td>
      <td>${activeTo.value}</td>
      <td class="text-end">
        <button class="btn btn-link btn-sm" onclick="this.closest('tr').remove();save()">×</button>
      </td>
    </tr>
  `;
  
  save();
  this.reset();
  bootstrap.Offcanvas.getInstance(offcanvasExample).hide();
};