import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Grid,
  MenuItem,
  IconButton,
  Alert,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import {
  FileUpload,
  Send,
  Email,
  Delete,
} from '@mui/icons-material';
import Navbar from '../components/web/UserNavbar';
import { storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const IssueRegistration = () => {
  const [formData, setFormData] = useState({
    challanNumber: '',
    email: '',
    issueType: '',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.challanNumber.match(/^[0-9]{1,2}$/)) {
      newErrors.challanNumber = 'Enter a valid challan number (1-2 digits)';
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.issueType) {
      newErrors.issueType = 'Select an issue type';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Provide a description';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(null);
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const apiData = {
        echallan: formData.challanNumber,
        email_address: formData.email,
        query_description: formData.description,
        issue_type: formData.issueType,
        document_url: uploadedFile ? uploadedFile.url : null,
      };

      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://127.0.0.1:8000/users/dashboard/echallan-query/', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(apiData)
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }
      const result = await response.json();
      setNotification({ type: 'success', message: `Issue registered! Ticket: ${result.ticket_no}` });

      // ✅ **Clear the input fields after successful submission**
      setFormData({
        challanNumber: '',
        email: '',
        issueType: '',
        description: '',
      });
      setUploadedFile(null);

    } catch (error) {
      setNotification({ type: 'error', message: error.message || 'Submission failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const uploadFile = async (file) => {
    setIsUploading(true);
    try {
      const fileRef = ref(storage, `documents/${Date.now()}_${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      setUploadedFile({ name: file.name, url });
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ minHeight: '100vh', backgroundColor: 'whitesmoke', py: 4, marginTop: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ maxWidth: 600, width: '100%', mx: 'auto' }}>
          <Card elevation={4}>
            <CardHeader title="Register E-Challan Issue" sx={{ textAlign: 'center', backgroundColor: '#1976d2', color: 'white', py: 2 }} />
            <CardContent>
              {notification && <Alert severity={notification.type} onClose={() => setNotification(null)}>{notification.message}</Alert>}
              <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField 
                      label="Challan Number" 
                      fullWidth 
                      required 
                      value={formData.challanNumber} 
                      onChange={(e) => setFormData({ ...formData, challanNumber: e.target.value })} 
                      error={!!errors.challanNumber} 
                      helperText={errors.challanNumber} 
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                      label="Email Address" 
                      fullWidth 
                      required 
                      type="email" 
                      value={formData.email} 
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                      InputProps={{ startAdornment: (<InputAdornment position="start"><Email /></InputAdornment>) }} 
                      error={!!errors.email} 
                      helperText={errors.email} 
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                      select 
                      label="Issue Type" 
                      fullWidth 
                      required 
                      value={formData.issueType} 
                      onChange={(e) => setFormData({ ...formData, issueType: e.target.value })} 
                      error={!!errors.issueType} 
                      helperText={errors.issueType}
                    >
                      <MenuItem value="incorrect_vehicle">Incorrect Vehicle Details</MenuItem>
                      <MenuItem value="wrong_location">Wrong Location</MenuItem>
                      <MenuItem value="duplicate">Duplicate Challan</MenuItem>
                      <MenuItem value="amount">Incorrect Amount</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                      label="Description" 
                      fullWidth 
                      required 
                      multiline 
                      rows={4} 
                      value={formData.description} 
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                      error={!!errors.description} 
                      helperText={errors.description} 
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="outlined" component="label" fullWidth startIcon={<FileUpload />} disabled={isUploading}>
                      {isUploading ? 'Uploading...' : 'Upload Document'}
                      <input type="file" hidden onChange={(e) => uploadFile(e.target.files[0])} accept=".jpg,.jpeg,.png,.pdf" />
                    </Button>
                    {uploadedFile && <p>{uploadedFile.name} <IconButton onClick={() => setUploadedFile(null)}><Delete /></IconButton></p>}
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <Send />} disabled={isSubmitting}>
                      Submit Issue
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default IssueRegistration;
