import type { ServiceFormValues } from "@/features/services/types/service";

export type ServiceFormErrors = Partial<
  Record<keyof ServiceFormValues | "image", string>
>;

export const serviceCategories = [
  "Smartphone",
  "Laptop & PC",
  "AC",
  "Refrigerator",
  "TV",
  "Washing Machine",
  "Electrical",
] as const;

export const serviceModes = [
  "Home Visit",
  "Shop Drop-off",
] as const;

export function validateServiceForm(
  values: ServiceFormValues,
  imageFile: File | null,
): ServiceFormErrors {
  const errors: ServiceFormErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!values.title.trim()) errors.title = "Service title is required.";
  if (!values.category) errors.category = "Category is required.";
  if (!values.serviceMode) errors.serviceMode = "Service mode is required.";
  if (!Number.isFinite(values.basePrice) || values.basePrice <= 0) {
    errors.basePrice = "Enter a valid base price.";
  }
  if (!values.estimatedDuration.trim()) {
    errors.estimatedDuration = "Estimated duration is required.";
  }
  if (!values.serviceArea.trim()) errors.serviceArea = "Service area is required.";
  if (!values.description.trim()) {
    errors.description = "Description is required.";
  } else if (values.description.trim().length < 20) {
    errors.description = "Use at least 20 characters.";
  }
  if (!values.technicianName.trim()) {
    errors.technicianName = "Technician name is required.";
  }
  if (!values.technicianEmail.trim()) {
    errors.technicianEmail = "Technician email is required.";
  } else if (!emailPattern.test(values.technicianEmail.trim())) {
    errors.technicianEmail = "Enter a valid email address.";
  }
  if (!imageFile && !values.image.trim()) {
    errors.image = "Add a service image.";
  } else if (values.image.trim()) {
    try {
      const url = new URL(values.image.trim());
      if (!["http:", "https:"].includes(url.protocol)) {
        errors.image = "Enter a valid HTTP or HTTPS image URL.";
      }
    } catch {
      errors.image = "Enter a valid image URL.";
    }
  }

  return errors;
}
